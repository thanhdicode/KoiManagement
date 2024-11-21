import axios from "axios";

export const createPondService = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/pond/create";
    const res = await axios.post(api, data, {
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

export const getUserPondService = async (userId) => {
  const token = localStorage.getItem("token");

  try {
    const api = `http://localhost:8080/pond/user/${userId}`;
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

export const detailPondService = async (pondId) => {
  const token = localStorage.getItem("token");

  try {
    const api = `http://localhost:8080/pond/${pondId}`;
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

export const deletePondService = async (pondId) => {
  const token = localStorage.getItem("token");

  try {
    const api = `http://localhost:8080/pond/delete/${pondId}`;
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

export const updatePondService = async (pondId, data) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/pond/update/${pondId}`;
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
