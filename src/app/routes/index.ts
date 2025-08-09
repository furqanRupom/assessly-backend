import express from "express"
import { authRoutes } from "../modules/auth"
import { adminRoutes } from "../modules/admin"
const router = express.Router()

const moduleRoutes = [
    { path: "/auth", route:authRoutes },
    { path: "/admin", route:adminRoutes },
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.route)
})
export default router;