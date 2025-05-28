import { createComment, getAllCommentsByProjectId, deleteComment } from "../controllers/comments.js";
import authMiddleware from "../middleware/auth.js";
import express from 'express';
const router = express.Router();

router.post('/create', authMiddleware, createComment);
router.get('/allByProjectId/:id', authMiddleware, getAllCommentsByProjectId);
router.delete('/delete', authMiddleware, deleteComment);

export default router;