import BaseController from "../../utils/BaseController";
import { authService } from "./auth.services";
import httpStatus from "http-status";

class Controller extends BaseController {
   
    register = this.catchAsync(async (req, res, next) => {
        const result = await authService.userRegister(req.body)
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User created successfully !',
            data: result
        })
    });
    login = this.catchAsync(async (req, res, next) => {
        const result = await authService.userLogin(req.body)
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User logged in successfully !',
            data: result
        })
    });
    verifyOtp = this.catchAsync(async (req, res, next) => {
        const result = await authService.verifyOtp(req.body)
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'OTP verified successfully !',
            data: result
        })
    });
    resendOtp = this.catchAsync(async (req, res, next) => {
        const result = await authService.resendVerificationCode(req.body.email)
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'OTP sent successfully !',
            data: result
        })
    });
    forgotPassword = this.catchAsync(async (req, res, next) => {
        const result = await authService.forgotPassword(req.body.email)
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Password reset link sent successfully !',
            data: result
        })
    });
    resetPassword = this.catchAsync(async (req, res, next) => {
        const result = await authService.resetPassword(req.body,req.query.token as string)
        this.sendResponse(res, {    
            statusCode: httpStatus.OK,
            success: true,
            message: 'Password reset successfully !',
            data: result
        })
    });
    refreshToken = this.catchAsync(async (req, res, next) => {
        const token = req.headers.authorization as string;
        const result = await authService.refreshToken(token)
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Refresh token verified successfully !',
            data: result
        })
    });
}
export const authController = new Controller();