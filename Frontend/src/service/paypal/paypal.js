import axios from "axios";

export const createPayment = async (data) => {
  try {
    const api = "http://localhost:8080/payment/create";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data && res.data.result && res.data.result.approval_url) {
      window.location.href = res.data.result.approval_url;
    }
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
