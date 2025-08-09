import { Schema, model, } from "mongoose";
import { IAssessment } from "./assessment.interface";



const assessmentSchema = new Schema<IAssessment>(
    {
        student: { type: Schema.Types.ObjectId, ref: "User", required: true },
        step: { type: Number, required: true },
        questions: [{ type: Schema.Types.ObjectId, ref: "Question", required: true }],
        answers: [
            {
                questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
                answer: { type: String, required: true },
            },
        ],
        startTime: { type: Date, default: Date.now },
        endTime: { type: Date },
        completed: { type: Boolean, default: false },
        score: { type: Number, default: 0 },
        certifiedLevel: { type: String },
    },
    { timestamps: true }
);

export const Assessment = model<IAssessment>("Assessment", assessmentSchema);
