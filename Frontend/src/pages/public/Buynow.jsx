import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import styles
import "../../styles/buynow/buynow.css";
// import components
import { Checkoutnav } from "../../components/navbar/Checkoutnav";
// import assets
import koiproduct from "../../assets/koiproduct.png";
// import service
import * as ProductService from "../../service/product/productService";
import * as PaypalService from "../../service/paypal/paypal";
export const Buynow = () => {
  // param
  const { productId } = useParams();
  // navigate
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  //   state
  const [quantity, setQuantity] = useState(1);
  // query
  const { data: productInfo = {} } = useQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => ProductService.detailProductService(productId),
  });
  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  //   calculator
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  const handleTotalPrice = (price, quantity) => {
    return price * quantity;
  };
  return (
    <div className="buynow-container">
      <Checkoutnav />
      <div className="buynow">
        <div className="buynow-main">
          <div className="buynow-main-header">
            <h2>Checkout</h2>
            <Link to="/shop">
              <i className="bx bx-arrow-back"></i>
              <p>Back to shop</p>
            </Link>
          </div>
          <form action="" autoComplete="off" className="buynow-form">
            <div className="input-item">
              <label htmlFor="fullname">Full name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                defaultValue={user.fullname || ""}
                placeholder="Enter full name"
              />
            </div>
            <div className="input-item">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                defaultValue={user.email || ""}
                name="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="input-item">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                defaultValue={user.phone || ""}
                name="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="input-item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                defaultValue={user.address || ""}
                name="address"
                id="address"
                placeholder="Enter your address"
              />
            </div>
          </form>
        </div>
        <div className="cart-review">
          <div className="cart-review-header">
            <h2>Review Your Cart</h2>
          </div>
          <div className="cart-list">
            <div className="cart-item">
              <img src={productInfo.image} alt="" />
              <div className="info">
                <div>
                  <strong>{productInfo.productName}</strong>
                  <small>x{quantity}</small>
                </div>
                <p>{productInfo?.category?.cateName}</p>
                <div className="quantity">
                  <span>{formatPrice(productInfo.unitPrice)}</span>
                  <div>
                    <p onClick={handlePlus}>+</p>
                    <p>{quantity}</p>
                    <p onClick={handleMinus}>-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-summary">
            <div className="summary-item">
              <p>Subtotal</p>
              <p>
                {formatPrice(handleTotalPrice(productInfo.unitPrice, quantity))}
              </p>
            </div>
            <div className="summary-item">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="summary-total">
              <strong>Total</strong>
              <strong>
                {formatPrice(handleTotalPrice(productInfo.unitPrice, quantity))}
              </strong>
            </div>
          </div>
          <Link to="/payment">Pay Now</Link>
        </div>
      </div>
    </div>
  );
};
