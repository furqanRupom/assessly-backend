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
        password:z.string({
            required_error:'Password is required'
        })
    })
})
export const authValidation = {
    registerValidation
}