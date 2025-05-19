import express from 'express';
import {createUser, loginUser, refreshToken, userDetails, clearCookies} from '../controllers/user.js';
import multer from 'multer';
const router = express.Router();
const upload = multer()
import authMiddleware from '../middleware/auth.js';

router.post('/create', upload.single('image_url'), createUser);
router.post('/login', loginUser);
router.get('/refreshToken', refreshToken);
router.get('/me', authMiddleware, userDetails);
router.get('/logout', clearCookies);
export default router;