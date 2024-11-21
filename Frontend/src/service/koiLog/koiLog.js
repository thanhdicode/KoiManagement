import axios from "axios";

export const addKoiLog = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const api = "http://localhost:8080/koi-growth-log/create";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.result;
  }
};
