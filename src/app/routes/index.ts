import express from "express"
import { authRoutes } from "../modules/auth"
import { adminRoutes } from "../modules/admin"
import { questionsRoutes } from "../modules/questions"
import { assessmentRoutes } from "../modules/assessment"
import { studentRoutes } from "../modules/student"
import { userRoutes } from "../modules/user"
const router = express.Router()

const moduleRoutes = [
    { path: "/auth", route: authRoutes },
    { path: "/user", route: userRoutes },
    { path: "/admin", route: adminRoutes },
    { path: "/question", route: questionsRoutes },
    { path: "/assessment", route: assessmentRoutes },
    { path: "/student", route: studentRoutes }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})
export default router;