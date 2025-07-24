import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/httpResponses';
import { UNAUTHORIZED, INVALID_TOKEN } from '../constants/messages';
import { STATUS_UNAUTHORIZED } from '../constants/statusCodes';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, STATUS_UNAUTHORIZED, UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as {
      id: string;
      email: string;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    return sendError(res, STATUS_UNAUTHORIZED, INVALID_TOKEN);
  }
};

// Alias for consistent naming
export const protect = authenticate;
