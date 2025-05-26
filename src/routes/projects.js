import express from 'express'; 
import authMiddleware from '../middleware/auth.js';
import {createProject, getAllProjectByUserId, deleteProject, getProjectById, getMembersFromProject, addMemberToProject } from '../controllers/projects.js';

const router = express.Router();

router.post('/create', authMiddleware, createProject);
router.get('/getAllByUser', authMiddleware, getAllProjectByUserId);
router.delete('/delete', authMiddleware, deleteProject);
router.get('/:id', authMiddleware, getProjectById);
router.get('/:id/members', authMiddleware, getMembersFromProject);
router.post('/:id/addMember', authMiddleware, addMemberToProject);
export default router;

