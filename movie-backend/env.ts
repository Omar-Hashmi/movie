// movie-backend/env.ts

import dotenv from 'dotenv';

dotenv.config(); // This loads from root .env automatically

if (!process.env.TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined in the environment variables.');
}

export const env = {
  PORT: process.env.PORT || '5000',
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  REDIS_HOST: process.env.REDIS_HOST || '',
  TMDB_API_KEY: process.env.TMDB_API_KEY as string,
};
