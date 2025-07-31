import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import api from "../services/axios";

const backgroundImages = [
  "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
  "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "https://image.tmdb.org/t/p/original/t7TDd0CWn1dpZrOqVtBsBjgGz3r.jpg",
  "https://image.tmdb.org/t/p/original/AcoVfiv1rrWOmAdpnAMnM56ki19.jpg",
  "https://image.tmdb.org/t/p/original/z5A5W3WYJc3UVEWljSGwdjDgQ0j.jpg",
  "https://image.tmdb.org/t/p/original/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg",
  "https://image.tmdb.org/t/p/original/bcZ2iVUKkzqZb5pbPmcqHdGmlvK.jpg",
  "https://image.tmdb.org/t/p/original/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        // ✅ Show success message
        setAlert({
          open: true,
          message: "You have logged in successfully!",
          severity: "success",
        });

        // Delay redirection slightly to show the alert
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        throw new Error("Login failed: No token received.");
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Login failed. Please check your credentials.";
      setAlert({
        open: true,
        message: msg,
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden" }}>
      {/* Previous background */}
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

      {/* Current background */}
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

      <Container
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 5,
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            minHeight: "470px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white" sx={{ mb: 3 }}>
            LOGIN
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ style: { color: "white", borderRadius: 10 } }}
              InputLabelProps={{ style: { color: "#bbb" } }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { color: "white", borderRadius: 10 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#bbb" } }}
            />
            <Button variant="contained" type="submit" fullWidth>
              LOGIN
            </Button>
          </Box>

          <Typography textAlign="center" color="white" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
            <RouterLink to="/signup" style={{ color: "#90caf9" }}>
              Sign up
            </RouterLink>
          </Typography>

          <Divider sx={{ my: 3, borderColor: "#666" }}>or sign in with</Divider>

          <Box display="flex" justifyContent="center" gap={2}>
            <IconButton sx={{ bgcolor: "#fff" }}>
              <GoogleIcon sx={{ color: "#DB4437" }} />
            </IconButton>
            <IconButton sx={{ bgcolor: "#fff" }}>
              <FacebookIcon sx={{ color: "#1877F2" }} />
            </IconButton>
            <IconButton sx={{ bgcolor: "#fff" }}>
              <GitHubIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
