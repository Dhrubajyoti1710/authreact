import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    Button, Container, Grid, Paper, TextField, Typography, Box,
} from "@mui/material";
import { verifyOtp } from "../../../api/functions/authFunctions";

export default function VerifyEmail() {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleKeyUp = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        } else if (index < otp.length - 1 && otp[index]) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const onSubmit = async (data) => {
        const otpValue = otp.join("");
        if (otpValue.length !== 4) return;
        await verifyOtp({ ...data, otp: otpValue }, navigate, setLoading);
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
                    <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
                        <Typography variant="h5" gutterBottom>
                            <b>Verify Your Email</b>
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                            <h4>Enter OTP</h4>
                            <Box display="flex" justifyContent="center" gap={1} mt={2}>
                                {otp.map((digit, index) => (
                                    <TextField
                                        key={index}
                                        id={`otp-${index}`}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value.slice(-1))}
                                        onKeyUp={(e) => handleKeyUp(e, index)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: { textAlign: "center", fontSize: "1.5rem" },
                                        }}
                                        sx={{ width: 50 }}
                                    />
                                ))}
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                sx={{ marginTop: 2 }}
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
