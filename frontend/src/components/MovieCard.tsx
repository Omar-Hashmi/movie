import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string | null;
};

const MovieCard = ({ id, title, posterPath }: MovieCardProps) => {
  const navigate = useNavigate();

  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : "/no-poster.png";

  return (
    <Card
      sx={{
        width: 200,
        minWidth: 200,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
        color: "text.primary",
        position: "relative",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/movies/${id}`)}>
        <CardMedia
          component="img"
          height="290"
          image={imageUrl}
          alt={title}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
      </CardActionArea>

      <Box
        sx={{
          px: 1.5,
          py: 1.2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          noWrap
          title={title}
          sx={{ maxWidth: "100%", textAlign: "center" }}
        >
          {title}
        </Typography>
      </Box>
    </Card>
  );
};

export default MovieCard;
