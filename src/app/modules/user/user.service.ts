import { User } from "./user.model"

class Service {
    async userProfile(id:string){
        const user = await User.findById(id).select('-password -__v')
        if (!user) {
            throw new Error('User not found')
        }
        return user
    }
}
export const userService = new Service()