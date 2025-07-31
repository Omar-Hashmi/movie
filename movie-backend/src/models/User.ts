import mongoose, { Schema, model, Document } from 'mongoose';
import { IUser, FavoriteMovie } from '../types/type';

// Extend IUser with Document for full schema typing
interface IUserDocument extends IUser, Document {}

const favoriteMovieSchema = new Schema<FavoriteMovie>(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    poster_path: { type: String },
    overview: { type: String },
  },
  { _id: false }
);

const userSchema = new Schema<IUserDocument>({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  favorites: { type: [favoriteMovieSchema], default: [] }, 
});

export const User = model<IUserDocument>('User', userSchema);
export default User;