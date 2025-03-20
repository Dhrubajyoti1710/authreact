import { baseURL } from "../../pages/Helper/Helper";

const API_ENDPOINTS = {
  PRODUCT: {
    CREATE: `${baseURL}/product/create`,
    GET_ALL: `${baseURL}/product`,
    GET_ONE: (id) => `${baseURL}/product/${id}`,
    UPDATE: (id) => `${baseURL}/product/update/${id}`,
    DELETE: (id) => `${baseURL}/product/delete/${id}`,
    FILTER: `${baseURL}/product/filter`,
  },
};

export default API_ENDPOINTS;
