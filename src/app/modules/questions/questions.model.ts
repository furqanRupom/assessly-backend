import { Schema, model, Document } from "mongoose";

export enum CompetencyLevel {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
}

export interface IQuestion extends Document {
    competency: string;
    level: CompetencyLevel;
    question: string;
    options: string[];
    correctAnswer: string;
    createdBy: Schema.Types.ObjectId;
}

const questionSchema = new Schema<IQuestion>(
    {
        competency: { type: String, required: true },
        level: { type: String, enum: Object.values(CompetencyLevel), required: true },
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export const Question = model<IQuestion>("Question", questionSchema);
