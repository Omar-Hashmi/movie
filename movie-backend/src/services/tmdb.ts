import axios from 'axios';
import { env } from '../../env';
import {
  TMDB_TRENDING_FETCHED,
  TMDB_SEARCH_SUCCESS,
  TMDB_FETCH_ERROR,
  TMDB_SEARCH_ERROR,
  QUERY_REQUIRED,
} from '../constants/messages';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: env.TMDB_API_KEY,
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await tmdb.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    throw new Error(TMDB_FETCH_ERROR);
  }
};

export const searchMovies = async (query: string) => {
  if (!query) {
    throw new Error(QUERY_REQUIRED);
  }

  try {
    const response = await tmdb.get('/search/movie', {
      params: { query },
    });
    return response.data.results;
  } catch (error) {
    throw new Error(TMDB_SEARCH_ERROR);
  }
};
