import express from 'express';
import { adminController } from './admin.controller';
import { adminService } from './admin.services';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get('/users-count', auth('admin', 'superAdmin'), adminController.getAllUsersCount);
router.get('/questions-per-level', auth('admin', 'superAdmin'), adminController.getQuestionsPerLevel);
router.get('/assessment-per-level', auth('admin', 'superAdmin'), adminController.getAssessmentPerLevel);
router.get('/avg-scores', auth('admin', 'superAdmin'), adminController.getAvgScores);
router.get('/admins',auth('admin', 'superAdmin'), adminController.getAllAdmins);
router.get('/students',auth('admin','superAdmin'), adminController.getAllUsers);
router.get('/supervisors',auth('admin', 'superAdmin'), adminController.getAllSupervisors);
router.post('/new-admin', auth('admin', 'superAdmin'), adminController.addAdmin);
router.post('/new-supervisor', auth('admin','superAdmin'), adminController.addSupervisor);
router.put('/update-user/:id',auth('admin','superAdmin'),adminController.updateUser)
router.delete('/delete-user/:id',auth('admin','superAdmin'),adminController.deleteUser)
export const adminRoutes = router;