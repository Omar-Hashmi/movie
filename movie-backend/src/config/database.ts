import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// Connect to MongoDB using the connection string from .env; 
// if not provided, it will default to an empty string which will cause an error.
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};