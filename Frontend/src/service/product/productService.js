import axios from "axios";
export const getAllProductShop = async () => {
  try {
    const response = await axios.get("http://localhost:8080/product/shop", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.result;
  } catch (error) {
    return error.response.data;
  }
};
export const getAllProductAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8080/product/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.result;
  } catch (error) {
    return error.response.data;
  }
};
export const createProductService = async (productData) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/product/create";
    const res = await axios.post(api, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const detailProductService = async (productId) => {
  try {
    const api = `http://localhost:8080/product/${productId}`;
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    return error.response.data;
  }
};
export const updateProductService = async (productId, data) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/product/update/${productId}`;
    const res = await axios.put(api, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteProductService = async (productId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/product/delete/${productId}`;
    const res = await axios.delete(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
