import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

import { User } from '../models/User';
import { IUser, RequestWithUser } from '../types/type';
import { generateToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/httpResponses';

import {
  EMAIL_EXISTS as EMAIL_ALREADY_EXISTS_MESSAGE,
  USER_CREATED as USER_CREATED_MESSAGE,
  SIGNUP_ERROR as SIGNUP_FAILURE_MESSAGE,
  LOGIN_ERROR as LOGIN_FAILURE_MESSAGE,
  USER_NOT_FOUND as USER_NOT_FOUND_MESSAGE,
  INVALID_PASSWORD as INVALID_PASSWORD_MESSAGE,
  LOGIN_ERROR as FETCH_PROFILE_ERROR,
} from '../constants/messages';

import {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
} from '../constants/statusCodes';

// Handles user signup logic
export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, STATUS_BAD_REQUEST, EMAIL_ALREADY_EXISTS_MESSAGE);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(String(newUser._id));
    // Return a 201 Created status and the token so the user is logged in immediately.
    return res.status(201).json({
      message: USER_CREATED_MESSAGE,
      token,
    });
  } catch (err) {
    return sendError(res, STATUS_INTERNAL_SERVER_ERROR, SIGNUP_FAILURE_MESSAGE, err);
  }
};

// Handles user login logic
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return sendError(res, STATUS_NOT_FOUND, USER_NOT_FOUND_MESSAGE);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, STATUS_UNAUTHORIZED, INVALID_PASSWORD_MESSAGE);
    }

    const token = generateToken(String(user._id)); // ✅ Final fix here

    return res.json({ token });
  } catch (err) {
    return sendError(res, STATUS_INTERNAL_SERVER_ERROR, LOGIN_FAILURE_MESSAGE, err);
  }
};

// Handles fetching the currently authenticated user's profile
export const getMe = async (req: RequestWithUser, res: Response) => {
  try {
    // The user ID is attached to `req.user` by the auth middleware
    const userId = req.user;
    if (!userId) {
      return sendError(res, STATUS_UNAUTHORIZED, "Authentication required.");
    }

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return sendError(res, STATUS_NOT_FOUND, USER_NOT_FOUND_MESSAGE);
    }

    return sendSuccess(res, "User profile fetched successfully.", user);
  } catch (err) {
    return sendError(res, STATUS_INTERNAL_SERVER_ERROR, FETCH_PROFILE_ERROR, err);
  }
};
