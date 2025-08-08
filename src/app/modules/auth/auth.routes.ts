import express from "express"
import { authController } from "./auth.controller"
import validateRequest from "../../middlewares/validateRequest"
import { authValidation } from "./auth.validation"
const router = express.Router()

router.post('/register',validateRequest(authValidation.registerValidation),authController.register)
router.post('/login',authController.login)
router.post('/verify-otp', authController.verifyOtp)
router.post('/resend-otp', authController.resendOtp)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password',validateRequest(authValidation.resetPasswordValidation), authController.resetPassword)
router.post('/refresh-token', authController.refreshToken)
export const authRoutes = router