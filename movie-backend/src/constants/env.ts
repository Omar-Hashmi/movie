// src/constants/env.ts

import dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || '';
export const PORT = process.env.PORT || '5000';
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const TMDB_API_KEY = process.env.TMDB_API_KEY || '';
export const OMDB_API_KEY = process.env.OMDB_API_KEY || '';
