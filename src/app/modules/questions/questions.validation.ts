import { z } from "zod";

 const createQuestionValidation = z.object({
    competency: z.string().min(1, "Competency is required"),
    level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
    question: z.string().min(1, "Question text is required"),
    options: z
        .array(z.string().min(1))
        .min(2, "At least two options are required"),
    correctAnswer: z.string().min(1, "Correct answer is required"),
});

export const questionValidation = {
    createQuestion: createQuestionValidation,
    updateQuestion: createQuestionValidation.partial(),
};