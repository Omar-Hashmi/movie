import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {ERROR_MESSAGES, HTTP_STATUS, sendResponse, sendErrorResponse } from '../constants/httpResponses';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

/**
 * Middleware to authenticate requests using JWT
 * @param req
 * @param res
 * @param next
 */
const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        sendErrorResponse(res, HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.NO_TOKEN);
        return;
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        (req as any).user = decoded;
        next();
    } catch (error) {
        sendErrorResponse(res, HTTP_STATUS.FORBIDDEN, ERROR_MESSAGES.INVALID_TOKEN);
    }
};

export default authMiddleware;