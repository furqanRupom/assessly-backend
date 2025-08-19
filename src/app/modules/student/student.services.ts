import { Assessment } from "../assessment";

class Service {
    async getCompetencyBreakDown(studentId: string) {
        const result = await Assessment.aggregate([
            {
                $match: {
                    student: studentId,
                },
            },
            { $unwind: "$answers" },
            {
                $lookup: {
                    from: "questions",
                    localField: "answers.questionId",
                    foreignField: "_id",
                    as: "questionData"
                }
            },
            { $unwind: "$questionData" },
            {
                $group: {
                    _id: "$questionData.competency",
                    attempts: { $sum: 1 },
                }
            },
            {
                $project: {
                    competency: "$_id",
                    attempts: 1,
                    _id: 0
                }
            }
        ])
        return result;

    }
}
export const studentService = new Service();