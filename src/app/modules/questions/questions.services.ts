import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { IQuestion, Question } from "./questions.model";
import httpStatus from "http-status";

class Service {
   async getAllQuestions(query: Record<string, unknown>) {
      const result = new QueryBuilder(Question.find(), query)
         .search(['competency', 'level', 'question', 'options', 'correctAnswer'])
         .filter()
         .sort()
         .paginate();
        const meta = await result.countTotal();
        return {
            data: await result.modelQuery,
            meta
        }
   }
   async getQuestionById(id:string) {
        const question = await Question.findById(id);
        if (!question) {
            throw new AppError(httpStatus.NOT_FOUND,"Question not found");
        }
        return question
   }
   async  addQuestion(data: IQuestion) {
        const question = await Question.create(data);
        return question;
   }
   async updateQuestion(id:string,data:Partial<IQuestion>) {
        const question = await Question.findByIdAndUpdate(id, data, { new: true });
        if (!question) {
            throw new AppError(httpStatus.NOT_FOUND,"Question not found");
        }
        return question
   }
   async deleteQuestion(id:string) {
        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            throw new AppError(httpStatus.NOT_FOUND,"Question not found");
        }
        return null
   }
}

export const questionService = new Service();