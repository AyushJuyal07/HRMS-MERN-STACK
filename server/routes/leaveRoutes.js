import express from 'express';
import {
  createLeave,
  getAllLeaves,
  updateLeaveStatus
} from '../controllers/leaveController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createLeave);
router.get('/get', protect, getAllLeaves);
router.patch('/update/:id', protect, updateLeaveStatus);

export default router;
