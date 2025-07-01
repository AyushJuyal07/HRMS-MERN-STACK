import express from 'express';
import { createCandidate, deleteCandidate, getAllCandidates } from '../controllers/candidateController.js';
import upload from '../middleware/upload.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, upload.single('resume'), createCandidate);
router.get('/', protect, getAllCandidates);
router.delete('/:id', protect, deleteCandidate);

export default router;
