import { z } from "zod";

const registerValidation = z.object({
    body:z.object({
        username:z.string({
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
        .max(32, 'Password must be at most 32 characters long')
    })
})
export const authValidation = {
    registerValidation
}