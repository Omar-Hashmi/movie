import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import {
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  sendResponse,
  sendErrorResponse,
  jsonResponse,
} from '../constants/httpResponses';

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and return JWT tokens
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return sendErrorResponse(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return jsonResponse(res, {
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.LOGIN_ERROR);
  }
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 */
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return sendErrorResponse(res, HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.EMAIL_EXISTS);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    return sendResponse(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.USER_CREATED);
  } catch (err) {
    return sendErrorResponse(res, HTTP_STATUS.SERVER_ERROR, ERROR_MESSAGES.REGISTER_FAILED);
  }
});

export default router;
