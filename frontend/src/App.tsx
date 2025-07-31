import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import MovieDetailsPage from "./pages/MovieDetails";
import FavoritesPage from "./pages/FavoritesPage";
import TopRated from "./pages/TopRated";
import SearchResults from "./pages/SearchResults";
import Trending from "./pages/Trending";
import  Popular from "./pages/Popular";
import NowPlaying from "./pages/NowPlaying";
import Upcoming from "./pages/Upcoming";
import Recommended from "./pages/Recommended"



const darkTheme = createTheme({
  palette: { mode: "dark" },
});

// Simple error boundary component
import { Component, type ReactNode } from "react";
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(_error: any, _errorInfo: any) {
    // You can log errorInfo here if needed
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ color: 'red', p: 4 }}>
          <h2>Something went wrong.</h2>
          <pre>{String(this.state.error)}</pre>
        </Box>
      );
    }
    return this.props.children;
  }
}


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Navbar />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/movies/:id" element={<MovieDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/top-rated" element={<TopRated />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/nowplaying" element={<NowPlaying />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/recommendations/:id" element={<Recommended />} />
            </Routes>
          </Box>
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
