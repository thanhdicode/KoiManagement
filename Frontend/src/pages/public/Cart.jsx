import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/cart/cart.css";
// import components
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import service
import * as CartService from "../../service/cart/cartService";
import { useSelector } from "react-redux";
export const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  const token = localStorage.getItem("token");
  // selector
  const totalItemInCart = useSelector(
    (state) => state.navbar.itemInCart.quantity
  );
  // state
  const [cartList, setCartList] = useState([]);
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  const [guestCartList, setGuestCartList] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: cartData = {},
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
    refetchOnWindowFocus: false,
  });
  // mutation
  const queryClient = useQueryClient();
  const quantityMutation = useMutation({
    mutationKey: ["update-quantity", cartData && cartData.cartId],
    mutationFn: ({ cartId, cartItemId, quantity }) => {
      return CartService.updateQuantity(cartId, cartItemId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-cart"]);
    },
  });
  const deleteMutation = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: CartService.deleteCartItem,
    onSuccess: () => {
      toast.success("Item removed", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      queryClient.invalidateQueries(["my-cart"]);
    },
  });
  // handle func
  const handleDeleteCartItemByGuest = (productId) => {
    CartService.removeFromGuestCart(productId);
    const updatedCart = CartService.getCartByGuest() || [];
    setGuestCartList(updatedCart);
    toast.success("Item removed", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handlePlusByGuest = (productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    CartService.updateGuestCartQuantity(productId, newQuantity);
    const updatedCart = CartService.getCartByGuest() || [];
    setGuestCartList(updatedCart);
  };
  const handleMinusByGuest = (productId, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    CartService.updateGuestCartQuantity(productId, newQuantity);
    const updatedCart = CartService.getCartByGuest() || [];
    setGuestCartList(updatedCart);
  };
  const handleDeleteCartItem = async (cartItemId) => {
    try {
      if (cartItemId) {
        await deleteMutation.mutateAsync(cartItemId);
      }
    } catch (error) {}
  };
  const handlePlus = async (cartId, cartItemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    try {
      if (cartId && cartItemId) {
        await quantityMutation.mutateAsync({
          cartId,
          cartItemId,
          quantity: newQuantity,
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const handleMinus = async (cartId, cartItemId, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity > 0) {
      try {
        if (cartId && cartItemId) {
          await quantityMutation.mutateAsync({
            cartId,
            cartItemId,
            quantity: newQuantity,
          });
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };
  useEffect(() => {
    document.title = "Cart";
    // logged-user
    if (token && user) {
      if (cartData && Array.isArray(cartData.cartItems)) {
        setCartList(cartData.cartItems);
        setIsEmptyCart(cartData.cartItems.length === 0);
      }
      if (isError) {
        setServerError("Server is closed now");
      } else {
        setServerError(null);
      }
    }
    // guest
    else {
      setIsEmptyCart(totalItemInCart === 0);
    }
  }, [cartData, cartList]);
  // format
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  // calculator
  const calculateItemPrice = (unitPrice, quantity) => {
    return unitPrice * quantity;
  };
  const calculateTotalPrice = () => {
    return cartList.reduce((total, item) => {
      return total + item.product.unitPrice * item.quantity;
    }, 0);
  };
  const calculateTotalPriceGuest = () => {
    return guestCartList.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  };
  return (
    <div className="cart-container">
      <Navbar />
      <Settingnav />
      <ToastContainer />

      {serverError ? (
        <div className="error-page">
          <p>{serverError}</p>
        </div>
      ) : isEmptyCart ? (
        <>
          <div className="empty">
            <p>Your cart is empty</p>
          </div>
        </>
      ) : (
        <>
          <div className="cart">
            {user && token ? (
              <>
                <div className="cart-main">
                  {cartList.map((item) => (
                    <div key={item.cartItemId} className="cart-item">
                      <i
                        className="bx bxs-trash-alt"
                        onClick={() => handleDeleteCartItem(item.cartItemId)}
                      ></i>
                      <img src={item.product.image} alt="" />
                      <div className="cart-item-info">
                        <h2>{item.product.productName}</h2>
                        <strong>{formatPrice(item.product.unitPrice)}</strong>
                        <div>
                          <p
                            onClick={() =>
                              handlePlus(
                                cartData.cartId,
                                item.cartItemId,
                                item.quantity
                              )
                            }
                          >
                            +
                          </p>
                          <p>{item.quantity}</p>
                          <p
                            onClick={() =>
                              handleMinus(
                                cartData.cartId,
                                item.cartItemId,
                                item.quantity
                              )
                            }
                          >
                            -
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="checkout-summary">
                  <div className="checkout-info">
                    {cartList.map((item) => (
                      <div
                        key={item.product.productId}
                        className="checkout-info-item"
                      >
                        <p>
                          {item.product.productName} (x{item.quantity})
                        </p>
                        <p>
                          {formatPrice(
                            calculateItemPrice(
                              item.product.unitPrice,
                              item.quantity
                            )
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="total">
                    <strong>Total</strong>
                    <strong>{formatPrice(calculateTotalPrice())}</strong>
                  </div>
                  <Link to="/checkout">PROCEED TO CHECKOUT</Link>
                </div>
              </>
            ) : (
              <>
                <div className="cart-main">
                  {guestCartList.map((item) => (
                    <div key={item.productId} className="cart-item">
                      <i
                        className="bx bxs-trash-alt"
                        onClick={() =>
                          handleDeleteCartItemByGuest(item.productId)
                        }
                      ></i>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info">
                        <h2>{item.productName}</h2>
                        <strong>{formatPrice(item.unitPrice)}</strong>
                        <div>
                          <p
                            onClick={() =>
                              handlePlusByGuest(item.productId, item.quantity)
                            }
                          >
                            +
                          </p>
                          <p>{item.quantity}</p>
                          <p
                            onClick={() =>
                              handleMinusByGuest(item.productId, item.quantity)
                            }
                          >
                            -
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="checkout-summary">
                  <div className="checkout-info">
                    {guestCartList.map((item) => (
                      <div key={item.productId} className="checkout-info-item">
                        <p>
                          {item.productName} (x{item.quantity})
                        </p>
                        <p>
                          {formatPrice(
                            calculateItemPrice(item.unitPrice, item.quantity)
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="total">
                    <strong>Total</strong>
                    <strong>{formatPrice(calculateTotalPriceGuest())}</strong>
                  </div>
                  <Link to="/checkout">PROCEED TO CHECKOUT</Link>
                </div>
              </>
            )}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};
