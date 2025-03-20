import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    Button, Container, Grid, Paper, TextField, Typography, FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio,
    InputAdornment, IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../../api/functions/authFunctions";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const sendData = async (data) => {
        await registerUser(data, navigate, setLoading);
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
                            <b>REGISTER</b>
                        </Typography>
                        <form onSubmit={handleSubmit(sendData)}>
                            <TextField
                                {...register("name", { required: "Name is required" })}
                                label="Full Name"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />

                            <TextField
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Invalid email format",
                                    },
                                })}
                                label="Email"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />

                            <TextField
                                {...register("phone", {
                                    required: "Phone number is required",
                                    minLength: { value: 10, message: "Must be at least 10 digits" },
                                    maxLength: { value: 10, message: "Must be at most 10 digits" },
                                })}
                                label="Phone Number"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                type="tel"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />

                            <TextField
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                })}
                                label="Password"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                error={!!errors.password}
                                helperText={errors.password?.message}
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

                            <Controller
                                name="role"
                                control={control}
                                defaultValue="user"
                                rules={{ required: "Role is required" }}
                                render={({ field }) => (
                                    <FormControl component="fieldset" margin="normal">
                                        <FormLabel component="legend">Role</FormLabel>
                                        <RadioGroup {...field} row>
                                            <FormControlLabel value="user" control={<Radio />} label="User" />
                                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                        </RadioGroup>
                                        {errors.role && <Typography color="error">{errors.role.message}</Typography>}
                                    </FormControl>
                                )}
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
                                {loading ? "Registering..." : "Register"}
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
