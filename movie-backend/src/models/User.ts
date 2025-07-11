import mongoose, { Document } from 'mongoose';
// User interface to define structure of the user document;
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', userSchema);
