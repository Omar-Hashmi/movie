import { Response } from 'express';
import bcrypt from 'bcrypt'; // You can use bcryptjs instead of bcrypt for better compatibility
import { User } from '../models/User';
import {
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
  STATUS_OK,
  STATUS_UNAUTHORIZED,
} from '../constants/statusCodes';
import {
  USER_NOT_FOUND,
  USER_UPDATED_SUCCESSFULLY,
  AUTH_REQUIRED,
  UNKNOWN_ERROR,
} from '../constants/messages';
import { RequestWithUser } from '../types/type';

// 🔐 Get User Profile
export const getUserProfile = async (req: RequestWithUser, res: Response) => {
  const userId = req.user;

  if (!userId) {
    return res.status(STATUS_UNAUTHORIZED).json({ message: AUTH_REQUIRED });
  }

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({
        success: false,
        message: USER_NOT_FOUND,
      });
    }

    return res.status(STATUS_OK).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(STATUS_BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : UNKNOWN_ERROR,
    });
  }
};

// ✏️ Update User Profile
export const updateUserProfile = async (req: RequestWithUser, res: Response) => {
  const userId = req.user;
  const { username, email } = req.body;

  if (!userId) {
    return res.status(STATUS_UNAUTHORIZED).json({ message: AUTH_REQUIRED });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({
        success: false,
        message: USER_NOT_FOUND,
      });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    return res.status(STATUS_OK).json({
      success: true,
      message: USER_UPDATED_SUCCESSFULLY,
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(STATUS_BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : UNKNOWN_ERROR,
    });
  }
};

// 🔒 Change Password
export const changePassword = async (req: RequestWithUser, res: Response) => {
  const userId = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(STATUS_UNAUTHORIZED).json({ success: false, message: AUTH_REQUIRED });
  }

  try {
    // ✅ Explicitly select password since it may be excluded by default
    const user = await User.findById(userId).select('+password');

    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({ success: false, message: USER_NOT_FOUND });
    }

    if (!currentPassword || !newPassword) {
      return res.status(STATUS_BAD_REQUEST).json({
        success: false,
        message: 'Current and new passwords are required.',
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(STATUS_BAD_REQUEST).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(STATUS_OK).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    return res.status(STATUS_BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : UNKNOWN_ERROR,
    });
  }
};

// ❌ Delete Account
export const deleteAccount = async (req: RequestWithUser, res: Response) => {
  const userId = req.user;

  if (!userId) {
    return res.status(STATUS_UNAUTHORIZED).json({ success: false, message: AUTH_REQUIRED });
  }

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(STATUS_NOT_FOUND).json({ success: false, message: USER_NOT_FOUND });
    }

    return res.status(STATUS_OK).json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    return res.status(STATUS_BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : UNKNOWN_ERROR,
    });
  }
};
