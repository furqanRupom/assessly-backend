import BaseController from "../../utils/BaseController";
import { adminService } from "./admin.services";
import httpStatus from "http-status";

class Controller extends BaseController {
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