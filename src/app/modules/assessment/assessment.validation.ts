import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
});

 const startAssessmentSchema = z.object({
    studentId: objectIdSchema,
    step: z.number().min(1).max(3, "Step must be between 1 and 3"),
});

 const submitAssessmentSchema = z.object({
    testSessionId: objectIdSchema,
    answers: z
        .array(
            z.object({
                questionId: objectIdSchema,
                answer: z.string().min(1, "Answer cannot be empty"),
            })
        )
        .min(1, "At least one answer is required"),
});

export const assessmentValidation = {
    startAssessment: startAssessmentSchema,
    submitAssessment: submitAssessmentSchema,
};


