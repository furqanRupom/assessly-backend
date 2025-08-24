import { Assessment } from "./assessment.model";
import httpStatus from "http-status";
import { User } from "../user";
import { Question, CompetencyLevel } from "../questions";
import { Types } from "mongoose";
import { IAssessment } from "./assessment.interface";
import AppError from "../../errors/AppError";
import { getCertificationLevel, STEP_LEVEL_MAP } from "./assessment.utils";



class Service {
    async startAssessment(studentId: string, step: number): Promise<IAssessment> {
        const student = await User.findById(studentId);
        if (!student) {
            throw new AppError(httpStatus.NOT_FOUND, "Student not found");
        }

        const levels = STEP_LEVEL_MAP[step];
        if (!levels) {
            throw new AppError(httpStatus.BAD_REQUEST, "Invalid step");
        }

        if (step === 1) {
            const prevStep1 = await Assessment.findOne({ student: studentId, step: 1, completed: true });
            if (prevStep1 && prevStep1.score < 25) {
                throw new AppError(httpStatus.FORBIDDEN, "You cannot retake step 1 after failing.");
            }
        }

        const questions = await Question.aggregate([
            { $match: { level: { $in: levels } } },
            { $sample: { size: 44 } }
        ]);

        if (questions.length < 44) {
            throw new AppError(httpStatus.BAD_REQUEST, "Not enough questions in pool");
        }
        const assessment = await Assessment.create({
            student: studentId,
            step,
            questions: questions.map(q => q._id),
            answers: [],
            startTime: new Date(),
            completed: false
        });

        return assessment;
    }

    async submitAssessment(testSessionId: string, answers: { questionId: Types.ObjectId; answer: string }[]) {
        const session = await Assessment.findById(testSessionId).populate("questions");
        if (!session) {
            throw new AppError(httpStatus.NOT_FOUND, "Test session not found");
        }
        if (session.completed) {
            throw new AppError(httpStatus.BAD_REQUEST, "Test already submitted");
        }

        let correctCount = 0;
        session.questions.forEach((question: any) => {
            const givenAnswer = answers.find(a => a.questionId.toString() === question._id.toString());
            if (givenAnswer && givenAnswer.answer === question.correctAnswer) {
                correctCount++;
            }
        });

        const scorePercent = (correctCount / session.questions.length) * 100;
        const level = getCertificationLevel(session.step, scorePercent);

        // Calculate time spent in seconds
        const startTime = session.startTime;
        const endTime = new Date();
        const timeSpent = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

        session.answers = answers;
        session.score = scorePercent;
        session.certifiedLevel = level;
        session.completed = true;
        session.endTime = endTime;
        session.timeSpent = timeSpent; // Add this field to your schema

        await session.save();

        return {
            score: scorePercent,
            certifiedLevel: level,
            totalQuestions: session.questions.length,
            correctAnswers: correctCount,
            timeSpent: timeSpent, // Include time spent in response
            proceedToNextStep:
                (session.step === 1 && scorePercent >= 75) ||
                (session.step === 2 && scorePercent >= 75)
        };
    }

    async getQuestionsByAssessment(assessmentId: string) {
        const assessment = await Assessment.findById(assessmentId).populate('questions');
        return assessment;
    }

    async getAllAssessments(query: Record<string, unknown>) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;

        const results = await Assessment.find()
            .populate("student", "name email")
            .populate("questions", "competency level questionText")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Assessment.countDocuments();

        return {
            data: results,
            meta: {
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async getAssessment(assessmentId: string) {
        const assessment = await Assessment.findById(assessmentId);
        if (!assessment) {
            throw new AppError(httpStatus.NOT_FOUND, "Assessment not found!")
        }
        return assessment;
    }

    async getStudentResults(studentId: string) {
        return await Assessment.find({ student: studentId })
            .populate("questions", "competency level questionText")
            .sort({ createdAt: -1 });
    }
}

export const assessmentService = new Service();
