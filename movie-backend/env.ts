import dotenv from 'dotenv';
import {
  TMDB_KEY_MISSING,
  DEFAULT_PORT,
  DEFAULT_JWT_EXPIRES_IN,
} from './src/constants/messages';

dotenv.config();

if (!process.env.TMDB_API_KEY) throw new Error(TMDB_KEY_MISSING);

export const env = {
  PORT: process.env.PORT || DEFAULT_PORT,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || DEFAULT_JWT_EXPIRES_IN,
  REDIS_HOST: process.env.REDIS_HOST || '',
  TMDB_API_KEY: process.env.TMDB_API_KEY as string,
};
