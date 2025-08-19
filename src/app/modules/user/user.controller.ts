import BaseController from "../../utils/BaseController";
import httpStatus  from "http-status";
import { userService } from "./user.service";
class controller extends BaseController {
    userProfile = this.catchAsync(async(req,res)=>{
        const user = await userService.userProfile(req.user.id);
       this.sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "User profile retrieved successfully",
            data: user
       })
    })
}
export const userController = new controller();