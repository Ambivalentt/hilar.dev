import express from 'express'; 
import authMiddleware from '../middleware/auth.js';
import {createTask, tasksById, deleteTask} from '../controllers/tasks.js';

const router = express.Router();

router.get('/project/:id', authMiddleware, tasksById);
router.post('/project/:id', authMiddleware, createTask);
router.delete('/delete', authMiddleware, deleteTask);
export default router;