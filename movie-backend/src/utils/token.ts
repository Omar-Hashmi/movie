import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../constants/env';
import logger from './logger';
import { httpStatus } from '../constants/response';

export const generateAccessToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'movie-backend',
  };

  return jwt.sign({ userId }, JWT_SECRET, options);
};

export const generateRefreshToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: '7d',
    issuer: 'movie-backend',
  };

  return jwt.sign({ userId }, JWT_SECRET, options);
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (err) {
    logger.error(`Token verification failed: ${err}`);
    return null;
  }
};