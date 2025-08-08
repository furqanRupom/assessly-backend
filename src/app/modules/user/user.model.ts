import { model, Schema, Types } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser,IUserModel>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["admin","supervisor","student"],
        default:"student"
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
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const userOtpSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        unique: true,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 5 * 60 * 1000),
        index: { expires: 0 } 
    }
},{ timestamps: true });




userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.statics.isExitsByCustomId = async function(id:string){
    return await User.findOne({id}).select('+password')
}

userSchema.statics.isExitsByEmail = async function(email:string){
    return await User.findOne({email})
}



userSchema.statics.isPasswordMatched = async function(inputPassword:string,userPassword:string){
    return await bcrypt.compare(inputPassword,userPassword)
}

export const User = model<IUser, IUserModel>('User',userSchema)
export const UserOtp = model('UserOtp', userOtpSchema);