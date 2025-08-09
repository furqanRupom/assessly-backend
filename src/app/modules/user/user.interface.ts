import { Model, Types } from "mongoose"
import { USER_ROLE } from "./user.constant"

export interface IUser {
    name: string,
    email: string,
    password: string
    role : 'admin' | 'student' | 'supervisor'  | 'superAdmin'
    status : 'active' | 'inactive' | 'banned' | 'blocked'
    isDeleted : boolean
    isVerified : boolean

}

export interface IUserModel extends Model<IUser> {
    isExitsByCustomId(id: string): Promise<boolean>
    isExitsByEmail(email: string): Promise<boolean>
    isPasswordMatched(inputPassword:string,userPassword:string):Promise<boolean>
}

export type IUserType = keyof typeof USER_ROLE
