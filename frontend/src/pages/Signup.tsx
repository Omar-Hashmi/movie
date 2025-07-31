import { useState, type FormEvent, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  IconButton,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import api from "../services/axios";

const backgroundImages = [
  "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
  "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "https://image.tmdb.org/t/p/original/t7TDd0CWn1dpZrOqVtBsBjgGz3r.jpg",
  "https://image.tmdb.org/t/p/original/AcoVfiv1rrWOmAdpnAMnM56ki19.jpg",
  "https://image.tmdb.org/t/p/original/z5A5W3WYJc3UVEWljSGwdjDgQ0j.jpg",
  "https://image.tmdb.org/t/p/original/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
  "https://image.tmdb.org/t/p/original/bcZ2iVUKkzqZb5pbPmcqHdGmlvK.jpg",
  "https://image.tmdb.org/t/p/original/keIxh0wPr2Ymj0Btjh4gW7JJ89e.jpg",
  "https://image.tmdb.org/t/p/original/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
  "https://image.tmdb.org/t/p/original/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
  "https://image.tmdb.org/t/p/original/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg",
  "https://image.tmdb.org/t/p/original/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg"
];

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPrevImageIndex(currentImageIndex);
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await api.post("/auth/signup", form);
      console.log("✅ Signup response:", res.data);

      // Redirect to login with success alert
      navigate("/login", { state: { success: "Account created successfully!" } });
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
    }
  };

  return (
    <Box sx={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden" }}>
      {/* Background transition */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundImage: `url(${backgroundImages[prevImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.7)",
          transition: "opacity 1s ease-in-out",
          opacity: fade ? 0 : 1,
          zIndex: -2,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.7)",
          transition: "opacity 1s ease-in-out",
          opacity: fade ? 1 : 0,
          zIndex: -1,
        }}
      />

      {/* Signup Form */}
      <Container maxWidth="xs" sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 5,
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white" sx={{ mb: 3 }}>
            SIGN UP
          </Typography>

          <Box component="form" onSubmit={handleSignup} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{ style: { color: "white", borderRadius: 10 } }}
              InputLabelProps={{ style: { color: "#bbb" } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{ style: { color: "white", borderRadius: 10 } }}
              InputLabelProps={{ style: { color: "#bbb" } }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              InputProps={{ style: { color: "white", borderRadius: 10 } }}
              InputLabelProps={{ style: { color: "#bbb" } }}
            />

            {error && (
              <Alert severity="error" sx={{ color: "white", background: "transparent" }}>
                {error}
              </Alert>
            )}

            <Button variant="contained" type="submit" fullWidth>
              SIGN UP
            </Button>
          </Box>

          <Typography textAlign="center" color="white" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <RouterLink to="/login" style={{ color: "#90caf9" }}>
              Login
            </RouterLink>
          </Typography>

          <Divider sx={{ my: 3, borderColor: "#666" }}>or sign up with</Divider>

          <Box display="flex" justifyContent="center" gap={2}>
            <IconButton color="primary" sx={{ bgcolor: "#fff" }}>
              <GoogleIcon sx={{ color: "#DB4437" }} />
            </IconButton>
            <IconButton color="primary" sx={{ bgcolor: "#fff" }}>
              <FacebookIcon sx={{ color: "#1877F2" }} />
            </IconButton>
            <IconButton color="primary" sx={{ bgcolor: "#fff" }}>
              <GitHubIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
