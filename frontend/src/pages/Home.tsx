import { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Skeleton,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MovieCard from "../components/MovieCard";
import api from "../services/axios";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

const Home = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollRefs = {
    trending: useRef<HTMLDivElement>(null),
    topRated: useRef<HTMLDivElement>(null),
    popular: useRef<HTMLDivElement>(null),
    nowPlaying: useRef<HTMLDivElement>(null),
    upcoming: useRef<HTMLDivElement>(null),
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollAmount = isMobile ? 160 : 160 * 3;

  const handleScroll = (key: keyof typeof scrollRefs, direction: "left" | "right") => {
    const el = scrollRefs[key].current;
    if (el) {
      el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          trendingRes,
          topRatedRes,
          popularRes,
          nowPlayingRes,
          upcomingRes,
        ] = await Promise.all([
          api.get("/movies/tmdb/trending"),
          api.get("/movies/tmdb/top-rated"),
          api.get("/movies/tmdb/popular"),
          api.get("/movies/tmdb/now-playing"),
          api.get("/movies/tmdb/upcoming"),
        ]);

        setTrending(trendingRes.data.data.results);
        setTopRated(topRatedRes.data.data.results);
        setPopular(popularRes.data.data.results);
        setNowPlaying(nowPlayingRes.data.data.results);
        setUpcoming(upcomingRes.data.data.results);
      } catch (err) {
        console.error("Failed to fetch movie data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <Box key={index} sx={{ width: 150, flexShrink: 0 }}>
        <Skeleton variant="rectangular" width={150} height={225} />
        <Skeleton width="80%" />
      </Box>
    ));
  };

  const renderSection = (
    title: string,
    movies: Movie[],
    refKey: keyof typeof scrollRefs
  ) => (
    <Box sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {/* Scroll Buttons */}
      <IconButton
        onClick={() => handleScroll(refKey, "left")}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(5px)",
          zIndex: 2,
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={() => handleScroll(refKey, "right")}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(5px)",
          zIndex: 2,
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Scrollable Movie Cards */}
      <Box
        ref={scrollRefs[refKey]}
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
        {loading
          ? renderSkeletons()
          : movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
              />
            ))}
      </Box>
    </Box>
  );

  return (
    <Container sx={{ py: 4 }}>
      {renderSection(" Trending", trending, "trending")}
      {renderSection(" Top Rated", topRated, "topRated")}
      {renderSection(" Popular", popular, "popular")}
      {renderSection(" Now Playing", nowPlaying, "nowPlaying")}
      {renderSection(" Upcoming", upcoming, "upcoming")}
    </Container>
  );
};

export default Home;
