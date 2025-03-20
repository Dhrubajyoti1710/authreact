import React, { useEffect, useState } from "react";
import axiosInstance from "../../Helper/Helper";
import { Card, CardContent, Typography, CircularProgress, Alert, Avatar, Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/profile");
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <Card sx={{ maxWidth: 400, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 80, height: 80, fontSize: 32 }}>
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
        </Box>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {user.phone || "N/A"}
          </Typography>
          <Typography variant="body1" color="text.primary" align="center" fontWeight="bold" mt={2}>
            Role: {user.role}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
