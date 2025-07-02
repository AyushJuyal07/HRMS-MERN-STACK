import express from 'express';
import { createCandidate, deleteCandidate, getAllCandidates, updateCandidateStatus } from '../controllers/candidateController.js';
import upload from '../middleware/upload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, upload.single('resume'), createCandidate);
router.get('/get', protect, getAllCandidates);
router.delete('/:id', protect, deleteCandidate);
router.patch('/update/:id', protect, updateCandidateStatus);

export default router;
