import axios from "axios";
//
//
//
// guest
export const addToCartByGuest = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (user && token) {
    localStorage.removeItem("cart");
  } else {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productExists = cart.find(
      (item) => item.productId === product.productId
    );
    if (productExists) {
      productExists.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const updateGuestCartQuantity = (productId, newQuantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = cart.findIndex((item) => item.productId === productId);

  if (productIndex !== -1) {
    if (newQuantity > 0) {
      cart[productIndex].quantity = newQuantity;
    } else {
      cart.splice(productIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeFromGuestCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCartByGuest = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};
//
//
//
// member
export const addToCartByMember = async (cartId, productId, quantity) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/${cartId}/add/${productId}`;

    const res = await axios.post(api, quantity, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const createCart = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/create`;
    const res = await axios.post(api, userId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("cartId", res.data.result.cartId);
    return res.data;
  } catch (error) {
    return error.response.result;
  }
};

export const getCartByMember = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/user/${userId}`;
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateQuantity = async (cartId, cartItemId, quantity) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/${cartId}/update/${cartItemId}`;
    const res = await axios.put(api, quantity, {
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

export const deleteCartItem = async (cartItemId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/delete/${cartItemId}`;
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
