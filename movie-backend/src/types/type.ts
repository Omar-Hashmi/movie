import { Document } from 'mongoose';
import { Request } from 'express';

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
}

// User without Mongoose methods
export interface IUser {
  username: string;
  email: string;
  password: string;
  favorites: FavoriteMovie[];
}

// Mongoose Document version
export interface IUserDocument extends IUser, Document {}

// An interface to extend the default Request type with the user property from auth middleware
export interface RequestWithUser extends Request {
  user?: string;
}
