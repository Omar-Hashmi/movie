import {
  AppBar,
  Toolbar,
  InputBase,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const GlassAppBar = styled(AppBar)(() => ({
  backgroundColor: "rgba(25, 25, 25, 0.6)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 999,
  padding: "6px 12px",
  maxWidth: 400,
  width: "100%",
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  color: theme.palette.text.primary,
}));

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setQuery("");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleClose();
    navigate("/login");
  };

  return (
    <GlassAppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
        <Box sx={{ width: 48 }} />

        {/* Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
        >
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </SearchContainer>
        </Box>

        {/* Avatar with dropdown (click only) */}
        <Box>
          <IconButton onClick={handleClick}>
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            transitionDuration={200}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: 2,
                  mt: 1,
                  minWidth: 160,
                  animation: "fadeIn 0.2s ease-in-out",
                },
              },
            }}
          >
            <MenuItem onClick={() => { navigate("/profile"); handleClose(); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate("/favorites"); handleClose(); }}>
              Favorites
            </MenuItem>
            {isLoggedIn ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={() => { navigate("/login"); handleClose(); }}>
                Login
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </GlassAppBar>
  );
};

export default Navbar;
