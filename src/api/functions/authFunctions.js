import axiosInstance from "../../pages/Helper/Helper";
import AUTH_ENDPOINTS from "../endpoints/authEndpoints";
import { toast } from "react-toastify";

export const login = async (data, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
    if (response.data.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/products");
        window.location.reload();
      }, 1000);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.");
  } finally {
    setLoading(false);
  }
};

export const registerUser = async (data, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, data);
    if (response.data.status === 201) {
      toast.success(response.data.message);
      navigate("/verify-email");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const forgotPassword = async (data, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
    toast.success(response.data.message);
    navigate("/login");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

export const updatePassword = async (data, navigate, setLoading) => {
  setLoading(true);
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.UPDATE_PASSWORD,
      { password: data.newPassword },
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
    );
    if (response.data.status === 200) {
      toast.success(response.data.message);
      navigate("/products");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Password update failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

export const verifyOtp = async (data, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.VERIFY_OTP, data);
    if (response.status === 200) {
      toast.success(response.data.message);
      navigate("/login");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Verification failed. Try again.");
  } finally {
    setLoading(false);
  }
};
