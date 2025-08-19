import express from 'express';
import { adminController } from './admin.controller';
import { adminService } from './admin.services';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get('/users-count', auth('admin', 'superAdmin'), adminController.getAllUsersCount);
router.get('/admins',auth('admin', 'superAdmin'), adminController.getAllAdmins);
router.get('/users',auth('admin','superAdmin'), adminController.getAllUsers);
router.get('/supervisors',auth('admin', 'superAdmin'), adminController.getAllSupervisors);
router.post('/new-admin', auth('admin', 'superAdmin'), adminController.addAdmin);
router.post('/new-supervisor', auth('admin','superAdmin'), adminController.addSupervisor);
export const adminRoutes = router;