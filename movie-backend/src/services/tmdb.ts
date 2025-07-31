// src/services/tmdb.ts
import axios from 'axios';
import { env } from '../../env';
import * as ERRORS from '../constants/messages';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: env.TMDB_API_KEY, language: 'en-US' },
});

const fetchFromTMDB = async (
  url: string,
  errorMessage: string,
  extraParams = {}
) => {
  try {
    const res = await tmdb.get(url, { params: extraParams });
    return res.data; // ✅ Return full data, not just results
  } catch {
    throw new Error(errorMessage);
  }
};

// ✅ Accept page param in all category functions
export const getPopularMovies = (page = 1) =>
  fetchFromTMDB('/movie/popular', ERRORS.POPULAR_MOVIES_ERROR, { page });

export const getTopRatedMovies = (page = 1) =>
  fetchFromTMDB('/movie/top_rated', ERRORS.TOP_RATED_ERROR, { page });

export const getUpcomingMovies = (page = 1) =>
  fetchFromTMDB('/movie/upcoming', ERRORS.UPCOMING_MOVIES_ERROR, { page });

export const getNowPlayingMovies = (page = 1) =>
  fetchFromTMDB('/movie/now_playing', ERRORS.NOW_PLAYING_ERROR, { page });

export const fetchTrendingMovies = (page = 1) =>
  fetchFromTMDB('/trending/movie/week', ERRORS.TMDB_FETCH_ERROR, { page });

export const searchMovies = (query: string, page = 1) => {
  if (!query) throw new Error(ERRORS.QUERY_REQUIRED);
  return fetchFromTMDB('/search/movie', ERRORS.TMDB_SEARCH_ERROR, { query, page });
};

export const getMovieDetails = (id: number) =>
  fetchFromTMDB(`/movie/${id}`, ERRORS.MOVIE_DETAILS_ERROR, {
    append_to_response: 'credits',
  });

export const getSimilarMovies = (id: number) =>
  fetchFromTMDB(`/movie/${id}/similar`, ERRORS.SIMILAR_MOVIES_ERROR);

export const getMovieRecommendations = (id: number) =>
  fetchFromTMDB(`/movie/${id}/recommendations`, ERRORS.RECOMMENDED_MOVIES_FETCH_ERROR);
