import express from 'express';
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/candidates', candidateRoutes);

export default router;
