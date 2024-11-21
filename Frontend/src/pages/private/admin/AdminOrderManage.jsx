import React from "react";
import { Outlet } from "react-router-dom";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { AdminOrderList } from "../../../components/adminorder/AdminOrderList";
// import styles
import "../../../styles/dashboard/adminorder/adminorder.css";
export const AdminOrderManage = () => {
  return (
    <div className="admin-order-container">
      <Dashnav />
      <div className="admin-order">
        <div className="admin-order-header">
          <strong>Order Manager</strong>
        </div>
        <div className="admin-order-utils">
          <div className="search-order">
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search order..." />
          </div>
          <div className="filter">
            <select name="" id="">
              <option value="">Filter</option>
              <option value="">By Date</option>
              <option value="">By Price</option>
              <option value="">By Number of Items</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div>
        </div>
        <AdminOrderList />
      </div>
      {/* <div className="admin-order-empty">
        <strong>No order was selected</strong>
        <p>You can click to a order to see detail</p>
      </div> */}
      <Outlet />
    </div>
  );
};
