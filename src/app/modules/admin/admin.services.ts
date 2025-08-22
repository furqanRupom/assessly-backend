import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Assessment } from "../assessment";
import { Question } from "../questions";
import { IUser, User, USER_ROLE } from "../user";

class Service {
    async getAllUsersCount() {
        const result = await User.find({ isDeleted: false, role: 'student' }).countDocuments();
        const supervisorsCount = await User.find({ isDeleted: false, role: 'supervisor' }).countDocuments();
        const adminsCount = await User.find({ isDeleted: false, role: 'admin' }).countDocuments();
        return {
            students: result,
            supervisors: supervisorsCount,
            admins: adminsCount
        }
    }
    async getQuestionsPerLevel() {
        const result = await Question.aggregate([
            {
                $group: {
                    _id: "$level",
                    count: { $sum: 1 }
                },
                $project: {
                    level: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ])
        return result;
    }
    async getAssessmentPerLevel() {
        const result = await Assessment.aggregate([
            {
                $match: {
                    certifiedLevel: { $exists: true, $ne: null }
                },
                $group: {
                    _id: "$certifiedLevel",
                    count: { $sum: 1 }
                },
                $project: {
                    level: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ])
        return result;
    }
    async getAvgScores() {
        const result = await Assessment.aggregate([
            {
                $match: {
                    completed: true,
                    certifiedLevel: { $exists: true }
                },
                $group: {
                    _id: "$certifiedLevel",
                    avg: { $avg: "$score" }
                },
                $project: {
                    level: "$_id",
                    avg: 1,
                    _id: 0
                }
            }
        ])
        return result;
    }

    async getAllAdmins(query: Record<string, unknown>) {
        let queryObj = {}
        queryObj = {
            ...query,
            role: "admin",
            isDeleted:false
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
            role: "student",
            isDeleted:false
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
            role: "supervisor",
            isDeleted:false
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

    async updateUser(data: IUser, userId: string) {
        const isUser = await User.findOne({
            id: userId,
        })
        if (!isUser) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
        }
        const result = await User.findByIdAndUpdate(userId, data, { new: true })
        return result;
    }
    async deleteUser(userId: string) {
        const isUser = await User.findOne({
            id: userId,
            isDeleted: false
        })
        if (!isUser) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!")
        }
        await User.findByIdAndUpdate(userId,{isDeleted:true})
        return null
    }
    async getDailyUserRegistrations(days: number = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const result = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate },
                    isDeleted: false,
                    role: { $in: ['student', 'admin', 'supervisor'] } // Correct usage
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: "$_id",
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: { date: 1 }
            }
        ]);

        return result;
    }

    async getUserRegistrationStats() {
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        today.setDate(today.getDate() - today.getDay()); // Reset for week calculation
        const startOfWeek = new Date(today);
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const matchStage = {
            isDeleted: false,
            role: { $in: ['student', 'admin', 'supervisor'] }
        };

        const [todayCount, weekCount, monthCount, totalCount] = await Promise.all([
            // Today's registrations
            User.countDocuments({
                ...matchStage,
                createdAt: { $gte: startOfToday }
            }),

            // This week's registrations
            User.countDocuments({
                ...matchStage,
                createdAt: { $gte: startOfWeek }
            }),

            // This month's registrations
            User.countDocuments({
                ...matchStage,
                createdAt: { $gte: startOfMonth }
            }),

            // Total registrations
            User.countDocuments(matchStage)
        ]);

        return {
            today: todayCount,
            thisWeek: weekCount,
            thisMonth: monthCount,
            total: totalCount
        };
    }

}
export const adminService = new Service();