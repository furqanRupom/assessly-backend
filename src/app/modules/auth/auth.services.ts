import AppError from "../../errors/AppError";
import { IUser, User } from "../user";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import config from "../../config";
import {  Secret } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
class Service {
    async userRegister(payload: IUser): Promise<IUser> {
        const isUserExitByEmail = await User.isExitsByEmail(payload.email)
        const isUserExitByUsername = await User.isExitsByUsername(payload.username)

        if (isUserExitByEmail || isUserExitByUsername) {
            throw new AppError(httpStatus.CONFLICT, `User already exits with email ${payload.email} or username ${payload.username}`)
        }

        const createUser = await User.create(payload)
        const user = await User.findById(createUser._id).select('-password')
        if (!user) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'User not found after creation');
        }
        return user;



    }
    async userLogin(payload: { email: string | null, username: string | null, password: string }) {
        if (!payload.email && !payload.username) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Email or username is required')
        }
        const user = await User.findOne({ $or: [{ email: payload.email }, { username: payload.username }] })
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found')
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
}

export const authService = new Service()