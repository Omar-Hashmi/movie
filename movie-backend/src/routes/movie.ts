import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchMovieDetails,
  fetchSimilarMovies,
  fetchMovieRecommendations,
  handleSearchMovies,
} from '../controller/movieController';

const router = express.Router();

// ✅ Health check for movie route
router.get('/test', (_req, res) => {
  res.send('✅ Movie router is working');
});

// ✅ TMDb-related movie endpoints
router.get('/tmdb/trending', asyncHandler(fetchTrendingMovies));
router.get('/tmdb/popular', asyncHandler(fetchPopularMovies));
router.get('/tmdb/top-rated', asyncHandler(fetchTopRatedMovies));
router.get('/tmdb/upcoming', asyncHandler(fetchUpcomingMovies));
router.get('/tmdb/now-playing', asyncHandler(fetchNowPlayingMovies));
router.get('/tmdb/details/:id', asyncHandler(fetchMovieDetails));
router.get('/tmdb/similar/:id', asyncHandler(fetchSimilarMovies));
router.get('/tmdb/recommendations/:id', asyncHandler(fetchMovieRecommendations));
router.get('/tmdb/search', asyncHandler(handleSearchMovies));

export default router;
