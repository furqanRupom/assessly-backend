import { User } from "./app/modules/user"
import bcrypt from "bcrypt"

export async function seedDatabase() {
    try {
        // create super admin
        const isSuperAdminExit = await User.findOne({ email: "super@admin.com" })
        if (isSuperAdminExit) {
            throw new Error("Super Admin already exists")
        }
        const hashedPassword = await bcrypt.hash("password", 10)
        const superAdmin = await User.create({
            email: "super@admin.com",
            name: "Super Admin",
            role: "superAdmin",
            status: "active",
            isDeleted: false,
            isVerified: true,
            password: hashedPassword,
        })
        console.log("Super Admin created:", superAdmin)
        
    } catch (error) {
        console.error(error)
    }
}

seedDatabase()