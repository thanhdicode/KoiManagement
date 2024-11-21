import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import styles
import "../../styles/paymentsuccess/paymentsuccess.css";
// import components
// import service
import * as OrderService from "../../service/order/order";
export const PaymentSuccess = () => {
  // navigation
  const navigate = useNavigate();
  //
  const orderReq = JSON.parse(localStorage.getItem("orderReq"));
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get("paymentId");
  // state
  const [submitData, setSubmitData] = useState({
    fullname: orderReq.fullname || "",
    email: orderReq.email || "",
    phone: orderReq.phone || "",
    address: orderReq.address || "",
    total: orderReq.total || "",
    cartId: orderReq.cartId || "",
    paymentId: paymentId || "",
  });
  const [responseData, setResponseData] = useState(null);
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-order"],
    mutationFn: OrderService.createInvoice,
    onSuccess: (response) => {
      setResponseData(response);
      queryClient.invalidateQueries("my-orders");
    },
  });
  // handle func
  const handleReturn = () => {
    localStorage.removeItem("orderReq");
    navigate("/");
  };
  const createOrder = async () => {
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      !orderReq ||
      !orderReq.fullname ||
      !orderReq.cartId ||
      !orderReq.total
    ) {
      navigate("/cart");
    } else {
      try {
        createOrder();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  return (
    <div className="payment-success-container">
      <div className="payment-success">
        <div className="payment-success-header">
          <i className="bx bxs-check-circle"></i>
          <strong>Payment Success!</strong>
          <p>Thank you for choosing Izumiya, here is your invoice.</p>
        </div>
        <div className="invoice">
          <div className="item">
            <p>Payment ID</p>
            <strong>{paymentId}</strong>
          </div>
          <div className="item">
            <p>Create Date</p>
            <strong>
              {new Date(
                responseData && responseData.createDate
              ).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </strong>
          </div>
          <div className="item">
            <p>Payment Method</p>
            <strong>Paypal</strong>
          </div>
          <div className="item">
            <p>Customer</p>
            <strong>{submitData.fullname}</strong>
          </div>
        </div>
        <div className="total">
          <p>Total</p>
          <strong>{formatPrice(submitData.total)}</strong>
        </div>
        <button onClick={handleReturn}>Return to homepage</button>
      </div>
    </div>
  );
};
