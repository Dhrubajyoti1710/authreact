import { baseURL } from "../../pages/Helper/Helper";

const AUTH_ENDPOINTS = {
  LOGIN: `${baseURL}/auth/login`,
  REGISTER: `${baseURL}/auth/register`,
  FORGOT_PASSWORD: `${baseURL}/auth/forgot-password`,
  RESET_PASSWORD: (token) => `${baseURL}/auth/reset-password/${token}`,
  UPDATE_PASSWORD: `${baseURL}/auth/update-password`,
  VERIFY_OTP: `${baseURL}/auth/verify-otp`
};

export default AUTH_ENDPOINTS;