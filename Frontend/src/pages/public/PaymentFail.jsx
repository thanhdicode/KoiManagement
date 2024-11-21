import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styles
import "../../styles/paymentfail/paymentfail.css";
export const PaymentFail = () => {
  // navigate
  const navigate = useNavigate();
  const orderReq = localStorage.getItem("orderReq");
  useEffect(() => {
    if (!orderReq) {
      navigate("/");
    }
    localStorage.removeItem("orderReq");
  }, []);
  return (
    <div className="payment-fail-container">
      <div className="payment-fail">
        <i className="bx bxs-error-circle"></i>
        <strong>Payment Fail!</strong>
        <p>
          Something went wrong when you were making payment. Please try again!
        </p>
        <Link to="/">Return to homepage</Link>
      </div>
    </div>
  );
};
