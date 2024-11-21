import axios from "axios";
export const getAllBlog = async () => {
  // const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8080/blog/list", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.result;
  } catch (error) {
    return error.response.data;
  }
};
export const getUserBlogs = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/blog/user/${userId}`;
    const response = await axios.get(api, {
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
export const createBlogService = async (blogData) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/blog/create";
    const res = await axios.post(api, blogData, {
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
export const updateBlogService = async (blogId, updatedBlogData) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/blog/update/${blogId}`;
    const res = await axios.put(api, updatedBlogData, {
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

export const detailBlogService = async (blogId) => {
  try {
    const api = `http://localhost:8080/blog/${blogId}`;
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

export const deleteBlogService = async (blogId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/blog/delete/${blogId}`;
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
