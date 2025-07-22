import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { fetchTrendingMovies, searchMovies } from '../services/tmdb';
import * as messages from '../constants/messages';

const router = express.Router();

// ✅ GET /api/movies/tmdb/trending (No auth)
router.get(
  '/tmdb/trending',
  asyncHandler(async (req: Request, res: Response) => {
    const movies = await fetchTrendingMovies();

    res.json({
      success: true,
      message: messages.TMDB_TRENDING_FETCHED || 'Trending movies fetched successfully.',
      data: movies,
    });
  })
);

// ✅ GET /api/movies/tmdb/search?q=batman (No auth)
router.get(
  '/tmdb/search',
  asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.q as string;

    if (!query) {
      res.status(400).json({
        success: false,
        message: messages.QUERY_REQUIRED || 'Search query is required.',
      });
      return;
    }

    const results = await searchMovies(query);

    res.json({
      success: true,
      message: messages.TMDB_SEARCH_SUCCESS || 'Movies searched successfully.',
      data: results,
    });
  })
);

export default router;
