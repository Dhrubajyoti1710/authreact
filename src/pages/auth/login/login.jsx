import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Button, Container, Grid, Paper, TextField, Typography,
  InputAdornment, IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../../api/functions/authFunctions";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const sendData = async (data) => {
    await login(data, navigate, setLoading);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              <b>SIGN IN</b>
            </Typography>

            <form onSubmit={handleSubmit(sendData)}>
              {/* Email Field */}
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email format",
                  },
                })}
                label="Your Email"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              {/* Password Field with Eye Icon */}
              <TextField
                {...register("password", { required: "Password is required" })}
                label="Your Password"
                fullWidth
                margin="normal"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Login Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                sx={{ marginTop: 2 }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
            <h5>Don't have an account? <a href="/register">Sign Up</a></h5>
            <h5>Forgot Password? <a href="/forgot-password">Reset Password</a></h5>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
