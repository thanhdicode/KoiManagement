import React from "react";
// import styles
import "../../../styles/dashboard/myorderdetail/myorderdetail.css";
// import slices
import { toggleCancelMyOrderModal } from "../../../redux/slices/modal/modal";
// import redux
import { useDispatch } from "react-redux";
export const MyOrderDetail = () => {
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleCancelMyOrderModal = () => {
    dispatch(toggleCancelMyOrderModal());
  };
  return (
    <div className="my-order-detail-container">
      <div className="my-order-detail-header">
        <h2>My Order #4124</h2>
        <p>Success</p>
      </div>
      <div className="my-order-main">
        <table className="cart">
          <thead>
            <tr>
              <th>No</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mazuri Koi Diet</td>
              <td>4</td>
              <td>$200</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mazuri Koi Diet</td>
              <td>4</td>
              <td>$200</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Mazuri Koi Diet</td>
              <td>4</td>
              <td>$200</td>
            </tr>
          </tbody>
        </table>
        <div className="info">
          <div className="header">
            <strong>Order Information</strong>
            <p>View all my infomation when ordering</p>
          </div>
          <div className="main">
            <div className="info-item">
              <strong>Date</strong>
              <p>10 Sep 2023</p>
            </div>
            <div className="info-item">
              <strong>Name</strong>
              <p>Truong Hoang Tri</p>
            </div>
            <div className="info-item">
              <strong>Email</strong>
              <p>trithse184813@fpt.edu.vn</p>
            </div>
            <div className="info-item">
              <strong>Phone</strong>
              <p>0776003669</p>
            </div>
            <div className="info-item">
              <strong>Address</strong>
              <p>1234 Yersin, Q1, TPHCM</p>
            </div>
          </div>
        </div>
        <button className="cancel" onClick={handleToggleCancelMyOrderModal}>
          Cancel this order
        </button>
      </div>
    </div>
  );
};
