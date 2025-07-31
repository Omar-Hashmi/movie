import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import RecommendIcon from "@mui/icons-material/Recommend";
import EventIcon from "@mui/icons-material/Event";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Top Rated", icon: <StarIcon />, path: "/top-rated" },
    { label: "Trending", icon: <WhatshotIcon />, path: "/trending" },
    { label: "NowPlaying", icon: <PlayArrowIcon />, path: "/nowplaying" },
    { label: "Popular", icon: <ThumbUpIcon />, path: "/popular" },
    { label: "Recommended", icon: <RecommendIcon />, path: "/recommendations/123" }, 
    { label: "Upcoming", icon: <EventIcon />, path: "/upcoming" },
  ];

  return (
    <Box
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            transition: "width 0.3s",
            overflowX: "hidden",
            whiteSpace: "nowrap",
            width: open ? 200 : 60,
            bgcolor: "background.default",
            borderRight: "1px solid #333",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          },
        }}
      >
        <List>
          {menuItems.map(({ label, icon, path }) => (
            <Tooltip key={label} title={!open ? label : ""} placement="right">
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
