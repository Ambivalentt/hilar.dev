import { recentActivity } from '../controllers/activity.js';
import authMiddleware from '../middleware/auth.js';
import express from 'express';
const router = express.Router();


router.get('/project/:id', authMiddleware, recentActivity);

export default router;