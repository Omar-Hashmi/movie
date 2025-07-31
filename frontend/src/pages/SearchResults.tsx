// src/pages/SearchResults.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/axios";
import MovieCard from "../components/MovieCard";
import {
  Box,
  Container,
  Typography,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";
  const pageParam = parseInt(queryParams.get("page") || "1", 10);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(pageParam);

  const fetchSearchResults = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await api.get(`/movies/tmdb/search?q=${query}&page=${page}`);
      const results: Movie[] = res.data.data.results;
      const totalResults = res.data.data.total_results;
      setMovies(results);
      setTotalPages(Math.ceil(totalResults / 20)); // 20 per page
    } catch {
      setMovies([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults();
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top on page change
  }, [query, page]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const params = new URLSearchParams(location.search);
    params.set("page", value.toString());
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for: <strong>{query}</strong>
      </Typography>

      {loading ? (
        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" justifyContent="center" mt={4}>
          {[...Array(8)].map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              width={160}
              height={240}
              animation="wave"
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      ) : movies.length === 0 ? (
        <Typography>No movies found.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              mt: 2,
            }}
          >
            {movies.map((movie) => (
              <Box key={movie.id} sx={{ width: 160 }}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                />
              </Box>
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default SearchResults;
