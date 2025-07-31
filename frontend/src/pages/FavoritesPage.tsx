import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Fade,
  Button,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Movie,
  Refresh,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const fetchFavorites = async (showRefreshIndicator = false) => {
    try {
      setError(null);
      if (showRefreshIndicator) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await api.get("/favorites");
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error("Failed to load favorites", err);
      setError("Could not load your favorite movies. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRefresh = () => {
    fetchFavorites(true);
  };

  const handleBrowseMovies = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            gap: 3,
          }}
        >
          <CircularProgress
            size={56}
            thickness={4}
            sx={{ color: theme.palette.primary.main }}
          />
          <Typography variant="h6" color="text.secondary">
            Loading your favorite movies...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Fade in>
          <Box>
            <Alert
              severity="error"
              sx={{
                borderRadius: 2,
                boxShadow: theme.shadows[3],
                mb: 3,
              }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleRefresh}
                  startIcon={<Refresh />}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          </Box>
        </Fade>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Fade in timeout={800}>
        <Box>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.1
              )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Favorite
                      sx={{ fontSize: 32, color: theme.palette.primary.main }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      Your Favorite Movies
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {favorites.length > 0
                        ? `You have ${favorites.length} favorite movie${
                            favorites.length === 1 ? "" : "s"
                          }`
                        : "Start building your collection"}
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={handleRefresh}
                    disabled={refreshing}
                    startIcon={
                      refreshing ? <CircularProgress size={16} /> : <Refresh />
                    }
                    sx={{ borderRadius: 2 }}
                  >
                    {refreshing ? "Refreshing..." : "Refresh"}
                  </Button>
                  {favorites.length === 0 && (
                    <Button
                      variant="contained"
                      onClick={handleBrowseMovies}
                      startIcon={<Search />}
                      sx={{ borderRadius: 2 }}
                    >
                      Browse Movies
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          </Paper>

          {/* Movie Grid */}
          {favorites.length > 0 ? (
            <Fade in timeout={1000}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 3,
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {favorites.map((movie, index) => (
                  <Fade in timeout={800 + index * 100} key={movie.id}>
                    <Box>
                      <MovieCard
                        id={movie.id}
                        title={movie.title}
                        posterPath={movie.poster_path}
                      />
                    </Box>
                  </Fade>
                ))}
              </Box>
            </Fade>
          ) : (
            <Fade in timeout={1000}>
              <Paper
                elevation={1}
                sx={{
                  p: 6,
                  textAlign: "center",
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.grey[50], 0.5),
                }}
              >
                <Box
                  sx={{ mb: 3, display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "50%",
                      bgcolor: alpha(theme.palette.grey[400], 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FavoriteBorder
                      sx={{ fontSize: 48, color: theme.palette.grey[400] }}
                    />
                  </Box>
                </Box>

                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  color="text.primary"
                >
                  No Favorite Movies Yet
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
                >
                  Start exploring movies and add them to your favorites to see
                  them here. Build your personal collection of must-watch films!
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleBrowseMovies}
                    startIcon={<Movie />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Discover Movies
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleRefresh}
                    startIcon={<Refresh />}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Refresh List
                  </Button>
                </Stack>
              </Paper>
            </Fade>
          )}
        </Box>
      </Fade>
    </Container>
  );
};

export default FavoritesPage;
