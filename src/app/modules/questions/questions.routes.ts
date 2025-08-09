import express from 'express';
const router = express.Router();
import { questionsController } from './questions.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { questionValidation } from './questions.validation';

router.get('/', auth('admin', 'superAdmin'), questionsController.getAllQuestions);
router.get('/:id', auth('admin', 'superAdmin'), questionsController.getQuestionById);
router.post('/', auth('admin', 'superAdmin'), validateRequest(questionValidation.createQuestion), questionsController.addQuestion);
router.put('/:id', auth('admin', 'superAdmin'), validateRequest(questionValidation.updateQuestion), questionsController.updateQuestion);
router.delete('/:id', auth('admin','superAdmin'), questionsController.deleteQuestion);

export const questionsRoutes = router;