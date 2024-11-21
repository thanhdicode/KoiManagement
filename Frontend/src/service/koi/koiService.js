import axios from "axios";

export const createKoiService = async (koiData) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/koi/create";
    const res = await axios.post(api, koiData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const detailKoiService = async (koiId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/koi/${koiId}`;
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteKoiService = async (koiId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/koi/delete/${koiId}`;
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

export const updateKoiService = async (koiId, data) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/koi/update/${koiId}`;
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
