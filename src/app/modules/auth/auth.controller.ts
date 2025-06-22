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
}
export const authController = new Controller();