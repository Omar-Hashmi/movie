import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/httpResponses';
import { UNAUTHORIZED, INVALID_TOKEN } from '../constants/messages';
import { STATUS_UNAUTHORIZED } from '../constants/statusCodes';

// Middleware to authenticate requests using JWT
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, STATUS_UNAUTHORIZED, UNAUTHORIZED);
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string };
    (req as any).user = decoded.userId;
    next();
  } catch (err) {
    return sendError(res, STATUS_UNAUTHORIZED, INVALID_TOKEN);
  }
};
