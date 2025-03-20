import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
    Button, Container, Grid, Paper, TextField, Typography, IconButton, InputAdornment 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updatePassword } from "../../../api/functions/authFunctions";

export default function UpdatePassword() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Unauthorized! Please login.");
            navigate("/login");
        }
    }, [navigate]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const sendData = async (data) => {
        await updatePassword(data, navigate, setLoading);
    };
    

    return (
        <Container 
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "100vh"
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ margin: "0 auto" }}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            <b>Update Password</b>
                        </Typography>
                        <form onSubmit={handleSubmit(sendData)}>
                            {/* New Password Field */}
                            <TextField
                                {...register("newPassword", {
                                    required: "New password is required",
                                    minLength: { value: 3, message: "Password must be at least 3 characters" },
                                })}
                                label="New Password"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                error={!!errors.newPassword}
                                helperText={errors.newPassword?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Confirm Password Field */}
                            <TextField
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === watch("newPassword") || "Passwords do not match",
                                })}
                                label="Confirm Password"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                type={showConfirmPassword ? "text" : "password"}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                sx={{ marginTop: 2 }}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
