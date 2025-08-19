import BaseController from "../../utils/BaseController";
import { adminService } from "./admin.services";
import httpStatus from "http-status";

class Controller extends BaseController {
    getAllUsersCount = this.catchAsync(async (req, res) => {
        const result = await adminService.getAllUsersCount();
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Users count fetched successfully",
            data: result
        })
    });
    getQuestionsPerLevel = this.catchAsync(async (req, res) => {
        const result = await adminService.getQuestionsPerLevel();
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Questions per level fetched successfully",
            data: result
        })
    });
    getAssessmentPerLevel = this.catchAsync(async (req, res) => {
        const result = await adminService.getAssessmentPerLevel();
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Assessments per level fetched successfully",
            data: result
        })
    });
    getAvgScores = this.catchAsync(async (req, res) => {
        const result = await adminService.getAvgScores();
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Average scores fetched successfully",
            data: result
        })
    });
    getAllAdmins = this.catchAsync(async (req, res) => {
        const result = await adminService.getAllAdmins(req.query);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Admins fetched successfully",
            data: result.data,
            meta: result.meta
        })
    });
    getAllUsers = this.catchAsync(async (req, res) => {
        const result = await adminService.getAllUsers(req.query);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Users fetched successfully",
            data: result.data,
            meta: result.meta
        })
    }
    );
    getAllSupervisors = this.catchAsync(async (req, res) => {
        const result = await adminService.getAllSupervisors(req.query);
        this.sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Supervisors fetched successfully",
            data: result.data,
            meta: result.meta
        })
    })
    addAdmin = this.catchAsync(async (req, res) => {
        const result = await adminService.addAdmin(req.body);
        this.sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Admin added successfully",
            data: result
        })
    });
    addSupervisor = this.catchAsync(async (req, res) => {
        const result = await adminService.addSupervisor(req.body);
        this.sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "Supervisor added successfully",
            data: result
        })
    })
}
export const adminController = new Controller();