import BaseController from "../../utils/BaseController";
import httpStatus from "http-status";
import { assessmentService } from "./assessment.services";

class Controller extends BaseController {
    getAllAssessments = this.catchAsync(async (req, res) => {
        const result = await assessmentService.getAllAssessments(req.query);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Assessments fetched successfully",
            data: result.data,
            meta: result.meta
        });
    });

    startAssessment = this.catchAsync(async (req, res) => {
        const { studentId, step } = req.body;
        const result = await assessmentService.startAssessment(studentId, step);
        this.sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Assessment started successfully",
            data: result
        });
    });

    submitAssessment = this.catchAsync(async (req, res) => {
        const { testSessionId, answers } = req.body;
        const result = await assessmentService.submitAssessment(testSessionId, answers);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Assessment submitted successfully",
            data: result
        });
    });

    getQuestionsByAssessment = this.catchAsync(async(req,res)=> {
        const result = await assessmentService.getQuestionsByAssessment(req.params.id);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Fetched assessment successfully!",
            data: result
        })
    })
    getAssessment = this.catchAsync(async(req,res)=> {
        const result = await assessmentService.getAssessment(req.params.id);
        this.sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:"Fetched assessment successfully!",
            data:result
        })
    })

    getStudentResults = this.catchAsync(async (req, res) => {
        const studentId = req.user._id;
        const results = await assessmentService.getStudentResults(studentId);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Results fetched successfully",
            data: results
        });
    });
}

export const assessmentController = new Controller();
