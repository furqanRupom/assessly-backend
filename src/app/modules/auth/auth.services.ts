import AppError from "../../errors/AppError";
import { IUser, User, UserOtp } from "../user";
import httpStatus from "http-status";
import { createToken, generateOtp } from "./auth.utils";
import config from "../../config";
import {  Secret } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import { mailService } from "./auth.mail";
class Service {
    async userRegister(payload: IUser): Promise<IUser> {
        const isUserExitByEmail = await User.isExitsByEmail(payload.email)

        if (isUserExitByEmail ) {
            throw new AppError(httpStatus.CONFLICT, `User already exits`);
        }

        const createUser = await User.create(payload)
        const user = await User.findById(createUser.id).select('-password')
        if (!user) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'User not found after creation');
        }
        const createOtp = await UserOtp.create({
            userId: user.id,
            otp: generateOtp()
        });
        if (!createOtp) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create OTP');
        }
        const sendingMail = await mailService.sendVerificationEmail(user.name, user.email, createOtp.otp);
        if (!sendingMail) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to send verification email');
        }
        return user;
    }

    async verifyOtp(payload: { otp: string }): Promise<IUser> {
        const userOtp = await UserOtp.findOne({
            otp: payload.otp,
            expiresAt: { $gt: new Date() },
        });
        if (!userOtp) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP');
        }
        const user = await User.findById(userOtp.userId);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found');
        }
        user.isVerified = true;
        
        await user.save();
        return user;
    }
    async userLogin(payload: { email: string, password: string }) {
        if (!payload.email) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Email is required')
        }
        const user = await User.findOne({ email: payload.email, isVerified:true }).select('+password')
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found or not verified')
        }
        const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password)
        if (!isPasswordMatched) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
        }
        const accessToken = createToken(
            { userId: user.id, role: user.role },
            config.secret_access_token as Secret,
            config.access_token_expires_in as jwt.SignOptions['expiresIn']
        );

        const refreshToken = createToken(
            { userId: user.id, role: user.role },
            config.secret_refresh_token as Secret,
            config.refresh_token_expires_in as jwt.SignOptions['expiresIn']
        );

        return {
            accessToken,
            refreshToken
        }
          
    }

    async forgotPassword(email: string) {
        if (!email) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Email is required');
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found');
        }
        const createOtp = await UserOtp.create({
            userId: user.id,
            otp: generateOtp()
        });
        if (!createOtp) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create OTP');
        }
        const sendingMail = await mailService.sendVerificationEmail(user.name, user.email, createOtp.otp);
        if (!sendingMail) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to send verification email');
        }
        return user;
    }
    async refreshToken(token: string) {
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Refresh token is required');
        }
        try {
            const decodedToken = jwt.verify(token, config.secret_refresh_token as Secret) as jwt.JwtPayload;
            const userId = decodedToken.userId;
            const user = await User.findById(userId).select('+password');
            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, 'User not found');
            }
            const accessToken = createToken(
                { userId: user.id, role: user.role },
                config.secret_access_token as Secret,
                config.access_token_expires_in as jwt.SignOptions['expiresIn']
            );
            return accessToken;
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid refresh token');
        }
    }

    
}

export const authService = new Service()