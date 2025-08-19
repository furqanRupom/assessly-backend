import QueryBuilder from "../../builder/QueryBuilder";
import { IUser, User } from "../user";

class Service {
    async getAllUsersCount() {
        const result = await User.find({ isDeleted: false, role: 'user' }).countDocuments();
        const supervisorsCount = await User.find({ isDeleted: false, role: 'supervisor' }).countDocuments();
        const adminsCount = await User.find({ isDeleted: false, role: 'admin' }).countDocuments();
        return {
            users: result,
            supervisors: supervisorsCount,
            admins: adminsCount
        }
    }
    
    async getAllAdmins(query: Record<string, unknown>) {
        let queryObj = {}
        queryObj = {
            ...query,
            role: "admin"
        }
        const result = new QueryBuilder(User.find(), queryObj)
            .search(['name', 'email', 'id'])
            .filter()
            .sort()
            .paginate()

        const meta = await result.countTotal();
        return {
            data: await result.modelQuery,
            meta
        }

    }
    async getAllUsers(query: Record<string, unknown>) {
        let queryObj = {}
        queryObj = {
            ...query,
            role: "user"
        }
        const result = new QueryBuilder(User.find(), queryObj)
            .search(['name', 'email', 'id'])
            .filter()
            .sort()
            .paginate()

        const meta = await result.countTotal();
        return {
            data: await result.modelQuery,
            meta
        }
    }
    async getAllSupervisors(query: Record<string, unknown>) {
        let queryObj = {}
        queryObj = {
            ...query,
            role: "supervisor"
        }
        const result = new QueryBuilder(User.find(), queryObj)
            .search(['name', 'email', 'id'])
            .filter()
            .sort()
            .paginate()

        const meta = await result.countTotal();
        return {
            data: await result.modelQuery,
            meta
        }
    }

    async addAdmin(data: IUser) {
        data.role = 'admin';
        data.isVerified = true;
        data.isDeleted = false;
        data.status = 'active';
        const admin = await User.create(data);
        return admin;
    }
    async addSupervisor(data: IUser) {
        data.role = 'supervisor';
        data.isVerified = true;
        data.isDeleted = false;
        data.status = 'active';
        const supervisor = await User.create(data);
        return supervisor;
    }
}
export const adminService = new Service();