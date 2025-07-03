import express from 'express';
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/candidates', candidateRoutes);
router.use('/employees', employeeRoutes);
router.use('/leaves', leaveRoutes);

export default router;
