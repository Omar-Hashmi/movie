import { Response } from 'express';
import {
  STATUS_OK,
} from '../constants/statusCodes';

export const sendSuccess = (res: Response, message: string, data?: any) =>
  res.status(STATUS_OK).json({ message, ...(data && { data }) });

export const sendError = (
  res: Response,
  status: number,
  message: string,
  error?: any
) => res.status(status).json({ message, ...(error && { error }) });
