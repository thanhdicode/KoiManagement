import axios from "axios";

export const createWaterService = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/water-param/create";
    const res = await axios.post(api, data, {
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
export const updateWaterService = async (waterId, data) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/water-param/update/${waterId}`;
    const res = await axios.put(api, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
