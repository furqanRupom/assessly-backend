import express from "express";
const router = express.Router();
import { studentController } from "./student.controller";
import auth from "../../middlewares/auth";

router.get('/competency-breakdown',auth('student'), studentController.getCompetencyBreakdown);
export const studentRoutes = router;