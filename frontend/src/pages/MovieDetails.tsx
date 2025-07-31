import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  Chip,
  Skeleton,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import api from "../services/axios";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
};

type MovieSummary = {
  id: number;
  title: string;
  poster_path: string | null;
};

export default function MovieDetailsPage() {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<MovieSummary[]>([]);
  const [similar, setSimilar] = useState<MovieSummary[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [movieRes, recRes, simRes, favRes] = await Promise.all([
          api.get(`/movies/tmdb/details/${id}`),
          api.get(`/movies/tmdb/recommendations/${id}`),
          api.get(`/movies/tmdb/similar/${id}`),
          api.get("/favorites"),
        ]);

        const movieData = movieRes.data.data;
        setMovie(movieData);
        setRecommendations(recRes.data.data.results);
        setSimilar(simRes.data.data.results);

        const isFav = favRes.data.favorites?.some(
          (fav: any) => fav.id === Number(id)
        );
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Failed to load movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      window.scrollTo(0, 0);
      fetchAll();
    }
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!movie) return;

    try {
      if (isFavorite) {
        await api.post("/favorites/remove", { id: movie.id });
        setSnackbar({ open: true, message: "Removed from favorites", severity: "success" });
        setIsFavorite(false);
      } else {
        const payload = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
        };
        await api.post("/favorites/add", payload);
        setSnackbar({ open: true, message: "Added to favorites", severity: "success" });
        setIsFavorite(true);
      }
    } catch (err: any) {
      console.error("Favorite toggle failed:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    }
  };

  const renderMovieList = (title: string, movies: MovieSummary[]) => (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom color="white">
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 1,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "grey.700",
            borderRadius: 2,
          },
        }}
      >
        {movies.length > 0 ? (
          movies.map((m) => (
            <MovieCard
              key={m.id}
              id={m.id}
              title={m.title}
              posterPath={m.poster_path}
            />
          ))
        ) : (
          <Typography variant="body2" color="white">
            No movies found.
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: movie?.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.85)",
          zIndex: 0,
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1, py: 5 }}>
        {loading || !movie ? (
          <Skeleton variant="rectangular" sx={{ height: 400, width: "100%" }} />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 4,
                mb: 6,
              }}
            >
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  width: isMobile ? "100%" : "30%",
                  borderRadius: 2,
                  boxShadow: 5,
                }}
              />

              <Box sx={{ color: "white", flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {movie.title}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  Release Date: {movie.release_date}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    readOnly
                  />
                  <Typography sx={{ ml: 1 }}>
                    {movie.vote_average.toFixed(1)}/10
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                  {movie.genres.map((genre) => (
                    <Chip key={genre.id} label={genre.name} color="primary" />
                  ))}
                </Box>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  {movie.overview}
                </Typography>

                <Button
                  onClick={handleToggleFavorite}
                  startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid #fff",
                    color: "#fff",
                    borderRadius: "999px",
                    px: 3,
                    py: 1,
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </Box>
            </Box>

            {renderMovieList("Similar Movies", similar)}
            {renderMovieList("Recommended for You", recommendations)}
          </>
        )}
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
