import { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Container,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Paper,
  Stack,
  Card,
  CardContent,
  IconButton,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Edit,
  Lock,
  Delete,
  Logout,
  Save,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

type User = {
  username: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/profile");
        setUser(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await api.put("/users/profile", {
        username: user?.username,
        email: user?.email,
      });
      alert(response.data.message || "Profile updated!");
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile");
      console.error(err);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill in both password fields");
      return;
    }
    
    try {
      const response = await api.put("/users/change-password", {
        currentPassword,
        newPassword,
      });
      alert(response.data.message || "Password changed!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert("Failed to change password");
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    try {
      await api.delete("/users/profile");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      alert("Failed to delete account");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            minHeight: "50vh",
            flexDirection: "column",
            gap: 2
          }}
        >
          <CircularProgress size={48} thickness={4} />
          <Typography variant="body1" color="text.secondary">
            Loading your profile...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Fade in>
          <Alert 
            severity="error" 
            sx={{ 
              borderRadius: 2,
              boxShadow: theme.shadows[3]
            }}
          >
            {error}
          </Alert>
        </Fade>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Fade in timeout={800}>
        <Box>
          {/* Header Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              mb: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    fontSize: '2rem',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    border: '3px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {user?.username.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    Welcome back, {user?.username}!
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {user?.email}
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleLogout}
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <Logout />
                </IconButton>
              </Box>
            </Box>
          </Paper>

          <Stack spacing={4}>
            {/* Profile Information Card */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Edit color="primary" />
                    Profile Information
                  </Typography>
                  <Button
                    variant={isEditing ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setIsEditing(!isEditing)}
                    startIcon={isEditing ? <Save /> : <Edit />}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </Box>
                
                <Stack spacing={3}>
                  <TextField
                    label="Username"
                    fullWidth
                    value={user?.username || ""}
                    onChange={(e) => setUser(user ? { ...user, username: e.target.value } : null)}
                    disabled={!isEditing}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    value={user?.email || ""}
                    onChange={(e) => setUser(user ? { ...user, email: e.target.value } : null)}
                    disabled={!isEditing}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                  />
                  {isEditing && (
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleUpdateProfile}
                        startIcon={<Save />}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Lock color="warning" />
                  Change Password
                </Typography>
                
                <Stack spacing={3}>
                  <TextField
                    label="Current Password"
                    type={showCurrentPassword ? "text" : "password"}
                    fullWidth
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          edge="end"
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                  <TextField
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleChangePassword}
                      startIcon={<Lock />}
                      disabled={!currentPassword || !newPassword}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Danger Zone Card */}
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                bgcolor: alpha(theme.palette.error.main, 0.02)
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  variant="h6" 
                  fontWeight={600} 
                  color="error"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                >
                  <Delete />
                  Danger Zone
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Once you delete your account, there is no going back. Please be certain.
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteAccount}
                  startIcon={<Delete />}
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                    }
                  }}
                >
                  Delete My Account
                </Button>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Fade>
    </Container>
  );
}