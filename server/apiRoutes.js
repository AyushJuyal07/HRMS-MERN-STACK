import express from 'express';
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/candidates', candidateRoutes);
router.use('/employees', employeeRoutes);

export default router;
