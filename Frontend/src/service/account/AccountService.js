import axios from "axios";

export const signupService = async (userData) => {
  try {
    const api = "http://localhost:8080/users/sign-up";
    const res = await axios.post(api, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
export const getUserListAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/users";
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    return err.response.data;
  }
};
export const getMyUserInfo = async () => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/users/my-info";
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    return err.response.data;
  }
};
export const verifyEmailSignup = async (userData) => {
  try {
    const api = "http://localhost:8080/auth/verify-sign-up";
    const res = await axios.post(api, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const forgetPassService = async (userData) => {
  try {
    const api = "http://localhost:8080/users/forgot-password";
    const res = await axios.post(api, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const verifyForgetPass = async (userData) => {
  try {
    const api = "http://localhost:8080/auth/verify-reset-password";
    const res = await axios.post(api, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const resetPasswordService = async (userData) => {
  try {
    const api = "http://localhost:8080/users/reset-password";
    const res = await axios.post(api, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const loginService = async (userData) => {
  try {
    const api = "http://localhost:8080/auth/sign-in";
    const res = await axios.post(api, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("token", res.data.result.token);
    localStorage.setItem("user", JSON.stringify(res.data.result.user));
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const verifyToken = async (token) => {
  try {
    const api = " http://localhost:8080/auth/introspect";
    const res = await axios.post(api, token, {
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

export const logoutService = async (token) => {
  try {
    const api = "http://localhost:8080/auth/logout";
    const res = await axios.post(api, token, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateMyInfo = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/users/update-my-info";
    const res = await axios.put(api, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("user", JSON.stringify(res.data.result));
    return res.data.result;
  } catch (error) {
    return error;
  }
};
export const oauthService = async (token) => {
  try {
    const api = "http://localhost:8080/auth/sign-in-by-google";
    const res = await axios.post(api, token, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("token", res.data.result.token);
    localStorage.setItem("user", JSON.stringify(res.data.result.user));
    console.log(res.data);
    return res.data.result;
  } catch (error) {
    return error.response.data;
  }
};
export const updatePassword = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/users/update-password";
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
export const deleteAccount = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/users/${userId}`;
    const res = await axios.delete(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const createAccountAdmin = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const api = "http://localhost:8080/users/admin/create";
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
