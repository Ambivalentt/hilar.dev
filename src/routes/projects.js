import express from 'express'; 
import authMiddleware from '../middleware/auth.js';
import {createProject, getAllProjectByUserId} from '../controllers/projects.js';

const router = express.Router();

router.post('/create', authMiddleware, createProject);
router.get('/getAllByUser', authMiddleware, getAllProjectByUserId);
export default router;