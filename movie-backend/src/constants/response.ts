import { Response } from 'express';

export const httpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({ success: false, message });
};

export const responseMessages = {
  // Success
  USER_CREATED: 'User created successfully',
  LOGIN_SUCCESS: 'Login successful',

  // Client Errors
  EMAIL_EXISTS: 'Email already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Invalid password',
  INVALID_CREDENTIALS: 'Invalid credentials',

  // Server Errors
  SIGNUP_ERROR: 'Signup error',
  LOGIN_ERROR: 'Login error',
  SERVER_ERROR: 'Internal server error',
  INVALID_CREDENTIALS: 'Invalid credentials',
};