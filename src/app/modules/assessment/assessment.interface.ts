import { Types, Document } from "mongoose";

export interface IAssessment extends Document {
    student: Types.ObjectId;
    step: number;
    questions: Types.ObjectId[];
    answers: { questionId: Types.ObjectId; answer: string }[];
    startTime: Date;
    endTime?: Date;
    completed: boolean;
    score: number;
    certifiedLevel?: string;
    timeSpent:number
}