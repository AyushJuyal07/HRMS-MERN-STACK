import express from 'express';
import { createEmployee, getEmployees, deleteEmployee } from '../controllers/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/get', protect, getEmployees);
router.post('/create', protect, createEmployee);
router.delete('/:id', protect, deleteEmployee);

export default router;
