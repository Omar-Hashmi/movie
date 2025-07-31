// src/routes/auth.ts

import { Router } from 'express';
import { signup, login, getMe } from '../controller/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

// A protected route to get the current user's profile
router.get('/me', authenticate, getMe);

export default router;
