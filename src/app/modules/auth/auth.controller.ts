import BaseController from "../../utils/BaseController";

class Controller extends BaseController {
    register = this.catchAsync(async (req, res, next) => {});
}
export const authController = new Controller();