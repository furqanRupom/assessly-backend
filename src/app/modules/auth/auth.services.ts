import AppError from "../../errors/AppError";
import { IUser, User, UserOtp } from "../user";
import httpStatus from "http-status";
import { createToken, generateOtp } from "./auth.utils";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import { mailService } from "./auth.mail";
import bcrypt from 'bcrypt';
class Service {
    async userRegister(payload: IUser): Promise<IUser> {
        const isUserExitByEmail = await User.isExitsByEmail(payload.email)

        if (isUserExitByEmail) {
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
        await mailService.sendVerificationEmail(user.name, user.email, createOtp.otp);

        return user;
    }

    async verifyOtp(payload: { otp: string }) {
        const userOtp = await UserOtp.findOne({
            otp: payload.otp,
            expiresAt: { $gt: new Date() },
        });
        if (!userOtp) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP');
        }
        const user = await User.findById(userOtp.userId).select('password');
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found');
        }
        user.isVerified = true;

        await user.save();
        const userInfo = await User.findById(user.id).select('-password');
        return userInfo;
    }
    async resendVerificationCode(email: string) {
        if (!email) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Email is required');
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found');
        }

        if (user.isVerified) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User is already verified');
        }

        await UserOtp.deleteMany({ userId: user.id });

        const newOtp = generateOtp();
        const createOtp = await UserOtp.create({
            userId: user.id,
            otp: newOtp
        });

        if (!createOtp) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create OTP');
        }

        await mailService.sendVerificationEmail(user.name, user.email, newOtp);

        return null

    }

    async userLogin(payload: { email: string, password: string }) {
        if (!payload.email) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Email is required')
        }
        const user = await User.findOne({ email: payload.email })
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found')
        }

        if (!user.isVerified) {
            const createOtp = await UserOtp.create({
                userId: user.id,
                otp: generateOtp()
            });
            if (!createOtp) {
                throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create OTP');
            }
            await mailService.sendVerificationEmail(user.name, user.email, createOtp.otp);

            throw new AppError(httpStatus.UNAUTHORIZED, 'User is not verified. Please check your email for verification OTP');
        }
        const isPasswordMatched = await bcrypt.compare(payload.password, user.password)
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
        const user = await User.findOne({ email, isVerified: true, isDeleted: false }).select('-password');
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found');
        }
        const token = createToken(
            { userId: user.id, role: user.role },
            config.secret_reset_token as Secret,
            config.reset_password_expires_in as jwt.SignOptions['expiresIn']
        );
        const passwordResetLink = `${config.client_url}/reset-password?userId=${user.id}&token=${token}`;
         await mailService.sendPasswordResetEmail(user.name, user.email, passwordResetLink);
        return null;
    }
    async resetPassword(payload: { userId: string, newPassword: string }, token: string) {
        const { userId, newPassword } = payload;
        if (!userId || !token || !newPassword) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User ID, token and new password are required');
        }
        const user = await User.findById(userId).select('+password');
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found');
        }
        const decodedToken = jwt.verify(token, config.secret_reset_token as Secret) as jwt.JwtPayload;
        if (decodedToken.userId !== userId) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePassword = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true }).select('-password');
        if (!updatePassword) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update password');
        }
        return null;
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