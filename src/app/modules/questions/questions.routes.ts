import express from 'express';
const router = express.Router();
import { questionsController } from './questions.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { questionValidation } from './questions.validation';

router.get('/questions', auth('admin'), questionsController.getAllQuestions);
router.get('/question/:id', auth('admin'), questionsController.getQuestionById);
router.post('/question', auth('admin'), validateRequest(questionValidation.createQuestion), questionsController.addQuestion);
router.put('/question/:id', auth('admin'), validateRequest(questionValidation.updateQuestion), questionsController.updateQuestion);
router.delete('/question/:id', auth('admin'), questionsController.deleteQuestion);

export const questionsRoutes = router;