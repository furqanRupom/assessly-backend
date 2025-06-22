import AppError from "../../errors/AppError";
import { IUser, User } from "../user";
import httpStatus from "http-status";
class Service {
    async userRegister (payload:IUser):Promise<IUser>{
        const isUserExitByEmail = await User.isExitsByEmail(payload.email)
        const isUserExitByUsername = await User.isExitsByUsername(payload.username)

        if(isUserExitByEmail || isUserExitByUsername){
            throw new AppError(httpStatus.CONFLICT,`User already exits with email ${payload.email} or username ${payload.username}`)
        }

        const createUser = await User.create(payload)
        const user = await User.findById(createUser._id).select('+password')
        if (!user) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'User not found after creation');
        }
        return user;

       
        
    }
}
export const authService = new Service()