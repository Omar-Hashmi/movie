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
    return res.data.results || res.data;
  } catch {
    throw new Error(errorMessage);
  }
};

const fetchCategory = (path: string, error: string) => () =>
  fetchFromTMDB(`/movie/${path}`, error);

// 🔹 Category Fetchers
export const getPopularMovies = fetchCategory('popular', ERRORS.POPULAR_MOVIES_ERROR);
export const getTopRatedMovies = fetchCategory('top_rated', ERRORS.TOP_RATED_ERROR);
export const getUpcomingMovies = fetchCategory('upcoming', ERRORS.UPCOMING_MOVIES_ERROR);
export const getNowPlayingMovies = fetchCategory('now_playing', ERRORS.NOW_PLAYING_ERROR);
export const fetchTrendingMovies = () =>
  fetchFromTMDB('/trending/movie/week', ERRORS.TMDB_FETCH_ERROR);

// 🔹 Search
export const searchMovies = (query: string) => {
  if (!query) throw new Error(ERRORS.QUERY_REQUIRED);
  return fetchFromTMDB('/search/movie', ERRORS.TMDB_SEARCH_ERROR, { query });
};

// 🔹 ID-based Fetchers
export const getMovieDetails = (id: number) =>
  fetchFromTMDB(`/movie/${id}`, ERRORS.MOVIE_DETAILS_ERROR, {
    append_to_response: 'credits',
  });

export const getSimilarMovies = (id: number) =>
  fetchFromTMDB(`/movie/${id}/similar`, ERRORS.SIMILAR_MOVIES_ERROR);

export const getMovieRecommendations = (id: number) =>
  fetchFromTMDB(`/movie/${id}/recommendations`, ERRORS.RECOMMENDED_MOVIES_FETCH_ERROR);
