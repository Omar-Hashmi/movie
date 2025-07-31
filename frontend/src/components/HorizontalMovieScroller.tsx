import { useEffect, useRef, useState } from "react";
import { Box, Typography, Skeleton, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MovieCard from "./MovieCard";
import api from "../services/axios";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

type Props = {
  title: string;
  endpoint: string; 
};

const HorizontalMovieScroller = ({ title, endpoint }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMovies = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const res = await api.get(`${endpoint}?page=${page}`);
      const results: Movie[] = res.data.data.results;
      setMovies((prev) => [...prev, ...results]);
      setHasMore(results.length > 0);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error fetching more movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || loading || !hasMore) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      fetchMovies();
    }
  };

  const handleArrowScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = 160 * 3;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Box sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {/* Scroll Buttons */}
      <IconButton
        onClick={() => handleArrowScroll("left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(5px)",
          zIndex: 2,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={() => handleArrowScroll("right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(5px)",
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 1,
          scrollBehavior: "smooth",
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: "grey.700",
            borderRadius: 2,
          },
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}

        {loading &&
          Array.from({ length: 4 }).map((_, idx) => (
            <Box key={idx} sx={{ width: 150, flexShrink: 0 }}>
              <Skeleton variant="rectangular" width={150} height={225} />
              <Skeleton width="80%" />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default HorizontalMovieScroller;
