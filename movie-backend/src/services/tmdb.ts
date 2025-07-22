import axios from 'axios';
import { env } from '../../env';

const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: env.TMDB_API_KEY,
        language    : 'en-US',
    },
});

export const fetchTrendingMovies = async () => {
    const response = await tmdb.get('/trending/movie/week');
    return response.data.results;
};

export const searchMovies = async (query: string) => {
    const response = await tmdb.get('/search/movie', {
        params: { query },
    });
    return response.data.results;
};