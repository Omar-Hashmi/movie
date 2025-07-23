// Authentication & User Messages
export const USER_CREATED = 'User created';
export const EMAIL_EXISTS = 'Email already exists';
export const SIGNUP_ERROR = 'Signup error';
export const LOGIN_ERROR = 'Login error';
export const USER_NOT_FOUND = 'User not found';
export const INVALID_PASSWORD = 'Invalid password';
export const UNAUTHORIZED = 'Unauthorized';
export const INVALID_TOKEN = 'Invalid token';

// Movies & TMDb
export const TMDB_DETAILS_FETCHED = 'Movie details fetched successfully';
export const TMDB_POPULAR_FETCHED = 'Popular movies fetched successfully';
export const TMDB_TOP_RATED_FETCHED = 'Top rated movies fetched successfully';
export const TMDB_TRENDING_ERROR = 'Failed to fetch trending movies';
export const MOVIE_DETAILS_ERROR = 'Failed to fetch movie details';
export const POPULAR_MOVIES_ERROR = 'Failed to fetch popular movies';
export const TOP_RATED_ERROR = 'Failed to fetch top rated movies';
export const UPCOMING_MOVIES_ERROR = 'Failed to fetch upcoming movies';
export const MOVIES_BY_GENRE_ERROR = 'Failed to fetch movies by genre';
export const GENRES_ERROR = 'Failed to fetch movie genres';
export const MOVIES_PLACEHOLDER = 'List of all movies (to be implemented)';
export const TMDB_FETCH_ERROR = 'Failed to fetch movies from TMDB';
export const TMDB_SEARCH_ERROR = 'Failed to search movies from TMDB';
export const TMDB_SEARCH_SUCCESS = 'Movies searched successfully';
export const TMDB_TRENDING_FETCHED = 'Trending movies fetched successfully';
export const MOVIE_DETAILS_FETCHED = 'Movie details fetched successfully';
export const POPULAR_MOVIES_FETCHED = 'Popular movies fetched successfully';
export const TOP_RATED_FETCHED = 'Top rated movies fetched successfully';
export const UPCOMING_MOVIES_FETCHED = 'Upcoming movies fetched successfully';
export const MOVIE_ID_REQUIRED = 'Movie ID is required';

// Validation & General
export const INVALID_MOVIE_ID = 'Invalid movie ID format';
export const MOVIE_NOT_FOUND = 'Movie not found';
export const QUERY_REQUIRED = 'Search query is required';


export const TMDB_KEY_MISSING = 'TMDB API key is missing in environment variables.';
export const DEFAULT_PORT = 3000;
export const DEFAULT_JWT_EXPIRES_IN = '1d';



// Database & Server
export const MONGODB_CONNECTED = '✅ MongoDB connected';
export const MONGODB_CONNECTION_ERROR = '❌ MongoDB connection error';
export const SERVER_START = (port: string | number) =>
  `Server running on http://localhost:${port}`;
