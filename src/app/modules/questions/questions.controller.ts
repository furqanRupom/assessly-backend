import BaseController from "../../utils/BaseController";
import { questionService } from "./questions.services";

class Controller extends BaseController {
    getAllQuestions = this.catchAsync(async (req, res) => {
        const result = await questionService.getAllQuestions(req.query);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Questions fetched successfully",
            data: result.data,
            meta: result.meta
        });
    })
    getQuestionById = this.catchAsync(async (req, res) => {
        const result = await questionService.getQuestionById(req.params.id);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Question fetched successfully",
            data: result
        });
    });
    addQuestion = this.catchAsync(async (req, res) => {
        const result = await questionService.addQuestion(req.body);
        this.sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Question added successfully",
            data: result
        });
    });
    updateQuestion = this.catchAsync(async (req, res) => {
        const result = await questionService.updateQuestion(req.params.id, req.body);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Question updated successfully",
            data: result
        });
    });
    deleteQuestion = this.catchAsync(async (req, res) => {
        const result = await questionService.deleteQuestion(req.params.id);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Question deleted successfully",
            data: result
        });
    }); 
}
export const questionsController = new Controller();