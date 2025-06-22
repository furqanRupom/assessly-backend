import { model, Schema, Types } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser,IUserModel>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["admin","moderator","user"],
        default:"user"
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["active","inactive","banned","blocked"],
        default:"active"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.statics.isExitsByCustomId = async function(id:string){
    return await User.findOne({id}).select('+password')
}

userSchema.statics.isExitsByEmail = async function(email:string){
    return await User.findOne({email})
}

userSchema.statics.isExitsByUsername = async function(username:string){
    return await User.findOne({username})
}

userSchema.statics.isPasswordMatched = async function(inputPassword:string,userPassword:string){
    return await bcrypt.compare(inputPassword,userPassword)
}

export const User = model<IUser, IUserModel>('User',userSchema)