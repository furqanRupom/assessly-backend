import { z } from "zod";

const registerValidation = z.object({
    body:z.object({
        name:z.string({
            required_error:'Name is required'
        }),
        email:z.string({
            required_error:'Email is required'
        }).email({
            message:'Invalid Email'
        }),
        password: z.string({
            required_error: 'Password is required'
        })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,32}$/, {
            message: 'Password must contain at least one letter, one number, and one special character'
        })
        .min(6, 'Password must be at least 6 characters long')
        .max(12, 'Password must be at most 12 characters long')
    })
})
const resetPasswordValidation = z.object({
    body: z.object({
        userId: z.string({
            required_error: 'User ID is required'
        }),
        newPassword: z.string({
            required_error: 'New password is required'
        })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,32}$/, {
            message: 'Password must contain at least one letter, one number, and one special character'
        })
        .min(6, 'Password must be at least 6 characters long')
        .max(12, 'Password must be at most 12 characters long')
    })  
        })
export const authValidation = {
    registerValidation,
    resetPasswordValidation
}