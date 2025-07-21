// db/connect.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger';
import { MONGODB_CONNECTED, MONGODB_CONNECTION_ERROR } from '../constants/messages';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    logger.info(MONGODB_CONNECTED);
  } catch (err) {
    logger.error(`${MONGODB_CONNECTION_ERROR}: ${err}`);
    process.exit(1);
  }
};
