import BaseController from "../../utils/BaseController";
import { studentService } from "./student.services";
import httpStatus from "http-status";

class Controller extends BaseController {
    getCompetencyBreakdown = this.catchAsync(async (req, res) => {
        const studentId  = req.user.id;
        const result = await studentService.getCompetencyBreakDown(studentId);
        this.sendResponse(res,{
            statusCode: httpStatus.OK,
            success:true,
            message: "Competency breakdown fetched successfully",
            data: result
        })
    
    })
}
export const studentController = new Controller();