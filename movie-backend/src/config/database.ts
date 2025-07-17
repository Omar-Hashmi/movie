// db/connect.ts

import mongoose from 'mongoose';
import logger from '../utils/logger';
import { MONGO_URI } from '../constants/env';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('✅ MongoDB connected');
  } catch (err) {
    logger.error(`❌ MongoDB connection error: ${err}`);
    process.exit(1);
  }
};
