import axios from "axios";

export const createInvoice = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/order/create/checkout";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.result.orders;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getAllOrders = async () => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/order/get-all-order";
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.result;
  } catch (error) {
    return error;
  }
};
export const getOwnOrders = async () => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/order/get-my-order";
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.result;
  } catch (error) {
    return error;
  }
};
