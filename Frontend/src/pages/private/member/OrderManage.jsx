import React from "react";
import { Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/ordermanage/ordermanage.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { MyOrderList } from "../../../components/myorder/MyOrderList";
import { CancelOrder } from "../../../components/modal/CancelOrder";
// import redux
import { useSelector } from "react-redux";
export const OrderManage = () => {
  // selector
  const isToggleCancelMyOrderModal = useSelector(
    (state) => state.modal.cancelMyOrderModal.isToggleModal
  );
  return (
    <div className="order-manage-container">
      <Dashnav />
      {isToggleCancelMyOrderModal && <CancelOrder />}
      <div className="order-manage">
        <div className="order-manage-header">
          <strong>My Order</strong>
        </div>
        <div className="order-manage-utils">
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
        <MyOrderList />
      </div>
      {/* <div className="my-order-empty">
        <strong>No order was selected</strong>
        <p>You can click to a order to see detail</p>
      </div> */}
      <Outlet />
    </div>
  );
};
