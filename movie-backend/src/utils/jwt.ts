import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || '',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    } as SignOptions
  );
};
