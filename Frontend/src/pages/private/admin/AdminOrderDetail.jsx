import React from "react";
// import styles
import "../../../styles/dashboard/adminorderdetail/adminorderdetail.css";
export const AdminOrderDetail = () => {
  return (
    <div className="admin-order-detail-container">
      <div className="admin-order-detail-header">
        <h2>Manh Cat's Order #4124</h2>
        <p>Success</p>
      </div>
      <div className="admin-order-main">
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
        <button className="cancel">Cancel this order</button>
      </div>
    </div>
  );
};
