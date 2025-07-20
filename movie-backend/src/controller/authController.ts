import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { IUser } from '../types/type';
import { sendSuccess, sendError } from '../utils/httpResponses';
import {
  EMAIL_EXISTS as EMAIL_ALREADY_EXISTS_MESSAGE,
  USER_CREATED as USER_CREATED_MESSAGE,
  SIGNUP_ERROR as SIGNUP_FAILURE_MESSAGE,
  LOGIN_ERROR as LOGIN_FAILURE_MESSAGE,
  USER_NOT_FOUND as USER_NOT_FOUND_MESSAGE,
  INVALID_PASSWORD as INVALID_PASSWORD_MESSAGE
} from '../constants/messages';

import { generateToken } from '../utils/jwt';
import {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_UNAUTHORIZED,
  STATUS_INTERNAL_SERVER_ERROR,
} from '../constants/statusCodes';

// Handles user signup logic
export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return sendError(res, STATUS_BAD_REQUEST, EMAIL_ALREADY_EXISTS_MESSAGE);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return sendSuccess(res, USER_CREATED_MESSAGE);
  } catch (err) {
    return sendError(res, STATUS_INTERNAL_SERVER_ERROR, SIGNUP_FAILURE_MESSAGE, err);
  }
};

// Handles user login logic
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }) as IUser | null;
    if (!user) 
      return sendError(res, STATUS_NOT_FOUND, USER_NOT_FOUND_MESSAGE);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) 
      return sendError(res, STATUS_UNAUTHORIZED, INVALID_PASSWORD_MESSAGE);

    const token = generateToken((user._id as string).toString());

    return res.json({ token });
  } catch (err) {
    return sendError(res, STATUS_INTERNAL_SERVER_ERROR, LOGIN_FAILURE_MESSAGE, err);
  }
};
