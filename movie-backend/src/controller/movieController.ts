import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/httpResponses';
import { MOVIES_PLACEHOLDER } from '../constants/messages';
import { STATUS_INTERNAL_SERVER_ERROR } from '../constants/statusCodes';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    sendSuccess(res, MOVIES_PLACEHOLDER);
  } catch (error) {
    sendError(res, STATUS_INTERNAL_SERVER_ERROR, 'Failed to fetch movies');
  }
};
