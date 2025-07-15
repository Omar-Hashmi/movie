import mongoose, { Schema, model } from 'mongoose';
import { IUser } from '../types/type';

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = model<IUser>('User', userSchema);
