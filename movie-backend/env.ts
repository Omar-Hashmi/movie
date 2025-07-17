// movie-backend/env.ts

import dotenv from 'dotenv';
dotenv.config();

import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });
export const env = {
  PORT: process.env.PORT || '5000',
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  REDIS_HOST: process.env.REDIS_HOST || '',
};
