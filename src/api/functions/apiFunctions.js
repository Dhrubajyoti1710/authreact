import axiosInstance from "../../pages/Helper/Helper";
import API_ENDPOINTS from "../endpoints/apiEndpoints";

export const createProduct = async (formData) => {
  try {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    formData.size.forEach((s) => data.append("size", s));
    formData.color.forEach((c) => data.append("color", c));
    data.append("brand", formData.brand);
    if (formData.image) {
      data.append("image", formData.image);
    }

    const response = await axiosInstance.post(API_ENDPOINTS.PRODUCT.CREATE, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCT.GET_ALL);
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCT.GET_ONE(id));
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching product details");
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    formData.size.forEach((s) => data.append("size", s));
    formData.color.forEach((c) => data.append("color", c));
    data.append("brand", formData.brand);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    const response = await axiosInstance.post(API_ENDPOINTS.PRODUCT.UPDATE(id), data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error updating product");
  }
};

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(API_ENDPOINTS.PRODUCT.DELETE(id));
    return response.data.message;
  } catch (error) {
    throw new Error("Error deleting product");
  }
};

export const filterProducts = async (filters) => {
  try {
    const params = {};
    Object.keys(filters).forEach((category) => {
      if (filters[category].length) {
        params[category] = filters[category].join(",");
      }
    });

    const response = await axiosInstance.get(API_ENDPOINTS.PRODUCT.FILTER, { params });
    return response.data.data;
  } catch (error) {
    throw new Error("Error filtering products");
  }
};
