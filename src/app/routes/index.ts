import express from "express"
import { authRoutes } from "../modules/auth"
import { adminRoutes } from "../modules/admin"
import { questionsRoutes } from "../modules/questions"
const router = express.Router()

const moduleRoutes = [
    { path: "/auth", route: authRoutes },
    { path: "/admin", route: adminRoutes },
    { path: "/question", route: questionsRoutes },
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})
export default router;