import express from 'express';
import { getUserProfile, updateUserProfile, changePassword, deleteAccount } from '../controller/userController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { updateUserProfileSchema, changePasswordSchema } from '../middleware/validation';

const router = express.Router();

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, validate(updateUserProfileSchema), updateUserProfile);
router.put('/change-password', authenticate, validate(changePasswordSchema), changePassword);
router.delete('/profile', authenticate, deleteAccount);

export const userRoutes = router;
