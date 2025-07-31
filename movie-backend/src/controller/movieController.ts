// src/controller/movieController.ts
import { Request, Response } from 'express';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieDetails,
  getSimilarMovies,
  getMovieRecommendations,
  searchMovies as searchFromTMDb,
  fetchTrendingMovies as fetchTrendingFromTMDb
} from '../services/tmdb';

import {
  POPULAR_MOVIES_FETCHED,
  TOP_RATED_FETCHED,
  UPCOMING_MOVIES_FETCHED,
  NOW_PLAYING_FETCHED,
  MOVIE_DETAILS_FETCHED,
  SIMILAR_MOVIES_FETCHED,
  RECOMMENDED_MOVIES_FETCHED,
  QUERY_REQUIRED,
  INVALID_MOVIE_ID,
  MOVIE_NOT_FOUND,
  TRENDING_MOVIES_FETCHED
} from '../constants/messages';

// ✅ Generic list handler with pagination
const handleList = (
  fetchFn: (page?: number) => Promise<any>,
  message: string
) => async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const data = await fetchFn(page);
  res.json({ success: true, message, data });
};

// ✅ Generic handler for ID-based fetches (no pagination)
const handleById = (
  fetchFn: (id: number) => Promise<any>,
  message: string
) => async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ success: false, message: INVALID_MOVIE_ID });
    return;
  }

  const data = await fetchFn(id);
  if (!data) {
    res.status(404).json({ success: false, message: MOVIE_NOT_FOUND });
    return;
  }

  res.json({ success: true, message, data });
};

// ✅ Exported controller functions
export const fetchTrendingMovies = handleList(fetchTrendingFromTMDb, TRENDING_MOVIES_FETCHED);
export const fetchPopularMovies = handleList(getPopularMovies, POPULAR_MOVIES_FETCHED);
export const fetchTopRatedMovies = handleList(getTopRatedMovies, TOP_RATED_FETCHED);
export const fetchUpcomingMovies = handleList(getUpcomingMovies, UPCOMING_MOVIES_FETCHED);
export const fetchNowPlayingMovies = handleList(getNowPlayingMovies, NOW_PLAYING_FETCHED);

export const fetchMovieDetails = handleById(getMovieDetails, MOVIE_DETAILS_FETCHED);
export const fetchSimilarMovies = handleById(getSimilarMovies, SIMILAR_MOVIES_FETCHED);
export const fetchMovieRecommendations = handleById(getMovieRecommendations, RECOMMENDED_MOVIES_FETCHED);

// ✅ Search handler with pagination
export const handleSearchMovies = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const page = parseInt(req.query.page as string) || 1;

  if (!query) {
    res.status(400).json({ success: false, message: QUERY_REQUIRED });
    return;
  }

  const data = await searchFromTMDb(query, page);
  res.json({ success: true, message: `Search results for "${query}"`, data });
};
