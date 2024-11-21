import React from "react";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleCancelMyOrderModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch } from "react-redux";
export const CancelOrder = () => {
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleCancelMyOrderModal = () => {
    dispatch(toggleCancelMyOrderModal());
  };
  return (
    <div className="cancel-order-containter">
      <div className="cancel-order-modal">
        <div className="cancel-order-header">
          <strong>Cancel Order</strong>
          <i className="bx bx-x" onClick={handleToggleCancelMyOrderModal}></i>
        </div>
        <div className="cancel-order-main">
          <p>Are you sure to cancel order #1214?</p>
        </div>
        <div className="submit">
          <button>Cancel this order</button>
        </div>
      </div>
    </div>
  );
};
