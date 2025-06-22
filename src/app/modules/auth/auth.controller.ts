import BaseController from "../../utils/BaseController";
import { authService } from "./auth.services";

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
}
export const authController = new Controller();