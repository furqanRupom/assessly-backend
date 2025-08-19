import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { IUserType } from '../modules/user/user.interface';
import { NextFunction, Request, Response } from 'express';
import { User } from '../modules/user';


const auth = (...requiredRoles: IUserType[]) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        const token = req.headers.authorization;

        if (!token) {
            return next(
                new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You're not not authorized !",
                )
            );
        }

        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(
                token,
                config.secret_access_token as string,
            ) as JwtPayload;
        } catch (error) {
            return next(
                new AppError(httpStatus.UNAUTHORIZED, 'token has been expired !')
            );
        }

        const { role, userId, iat } = decoded;
        if (requiredRoles && !requiredRoles.includes(role)) {
            return next(
                new AppError(
                    httpStatus.UNAUTHORIZED,
                    'Access denied.Unauthorized authentication !',
                )
            );
        }

        const user = await User.findById(userId)
        if (!user) {
            return next(
                new AppError(httpStatus.NOT_FOUND, 'The user is not found !')
            );
        }

        if (user.isDeleted) {
            return next(
                new AppError(httpStatus.BAD_REQUEST, 'User is deleted !')
            );
        }

        if (user.status === 'blocked') {
            return next(
                new AppError(httpStatus.BAD_REQUEST, 'The User is blocked !')
            );
        }

        req.user = decoded as JwtPayload;
        next();
    };
};

export default auth;
