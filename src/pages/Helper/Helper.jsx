import axios from "axios";
//let adminUrl = "http://localhost:3003/api";
let adminUrl = "https://react-we-8.onrender.com/api";

export const baseURL = adminUrl;
let axiosInstance = axios.create({
  baseURL,
});
// export const productImageShow = (media) => {
//   return `http://localhost:3003/${media}`;
// };
export const productImageShow = (media) => {
  return `https://react-we-8.onrender.com/${media}`;
};

axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
