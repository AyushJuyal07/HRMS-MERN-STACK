import express from 'express';
import { createEmployee, getEmployees, deleteEmployee, updateEmployee, markTodayAttendance } from '../controllers/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/get', protect, getEmployees);
router.post('/create', protect, createEmployee);
router.patch('/update/:id', protect, updateEmployee);
router.delete('/:id', protect, deleteEmployee);
router.post('/mark-today-attendance', protect, markTodayAttendance);

export default router;
