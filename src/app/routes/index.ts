import express from "express"
import { authRoutes } from "../modules/auth"
import { adminRoutes } from "../modules/admin"
import { questionsRoutes } from "../modules/questions"
import { assessmentRoutes } from "../modules/assessment"
const router = express.Router()

const moduleRoutes = [
    { path: "/auth", route: authRoutes },
    { path: "/admin", route: adminRoutes },
    { path: "/question", route: questionsRoutes },
    { path: "/assessment", route: assessmentRoutes }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})
export default router;