import { Model, Types } from "mongoose"
import { USER_ROLE } from "./user.constant"

export interface IUser {
    username: string,
    email: string,
    password: string
    role : 'admin' | 'user' | 'moderator' 
    status : 'active' | 'inactive' | 'banned' | 'blocked'
    isDeleted : boolean

}

export interface IUserModel extends Model<IUser> {
    isExitsByCustomId(id: string): Promise<boolean>
    isExitsByEmail(email: string): Promise<boolean>
    isExitsByUsername(username: string): Promise<boolean>
    isPasswordMatched(inputPassword:string,userPassword:string):Promise<boolean>
}

export type IUserType = keyof typeof USER_ROLE
