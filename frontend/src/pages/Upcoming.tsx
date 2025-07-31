import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Pagination,
  Skeleton,
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import api from "../services/axios";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

const Upcoming = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNum: number) => {
    setLoading(true);
    try {
      console.log("📆 Fetching upcoming movies | Page:", pageNum);
      const res = await api.get(`/movies/tmdb/upcoming?page=${pageNum}`);
      const data = res.data.data;
      console.log("🔮 Response:", data);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("❌ Error fetching upcoming movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageChange = (_: any, value: number) => {
    console.log("🔄 Page changed to:", value);
    setPage(value);
  };

  const skeletonArray = Array.from({ length: 10 });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming 
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {loading
          ? skeletonArray.map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: { xs: "45%", sm: "30%", md: "18%" },
                  minWidth: 180,
                }}
              >
                <Skeleton variant="rectangular" height={290} sx={{ borderRadius: 2 }} />
                <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
              </Box>
            ))
          : movies.map((movie) => (
              <Box
                key={movie.id}
                sx={{
                  width: { xs: "45%", sm: "30%", md: "18%" },
                }}
              >
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                />
              </Box>
            ))}
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}
    </Container>
  );
};

export default Upcoming;
