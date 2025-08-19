import express from "express"
import auth from "../../middlewares/auth"
import { userController } from "./user.controller"
const router = express.Router()
router.get("/profile",auth(),userController.userProfile)
export const userRoutes = router