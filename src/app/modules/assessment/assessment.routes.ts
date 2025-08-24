import express from "express";
import { assessmentController } from "./assessment.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { assessmentValidation } from "./assessment.validation";

const router = express.Router();

router.post(
    "/start-assessment",
    auth("student"),
    validateRequest(assessmentValidation.startAssessment),
    assessmentController.startAssessment
);

router.post(
    "/submit-assessment",
    auth("student"),
    validateRequest(assessmentValidation.submitAssessment),
    assessmentController.submitAssessment
);

router.get("/", auth("admin", "superAdmin"), assessmentController.getAllAssessments);
router.get("/:id",auth('admin','superAdmin','student','supervisor'),assessmentController.getAssessment)


router.get(
    "/results",
    auth("student"),
    assessmentController.getStudentResults
);
export const assessmentRoutes = router;
