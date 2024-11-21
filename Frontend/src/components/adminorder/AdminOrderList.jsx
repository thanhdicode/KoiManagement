import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/adminorder/adminorder.css";
// import service
import * as OrderService from "../../service/order/order";
export const AdminOrderList = () => {
  const statusClassName = {
    pending: "pending",
    success: "success",
    cancel: "cancel",
    delivering: "delivering",
  };
  const statusTitle = {
    pending: "Pending",
    success: "Success",
    cancel: "Cancel",
    delivering: "Delivering",
  };
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: orders = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: OrderService.getAllOrders,
  });
  // handle func
  const handleOrderStatusClassName = (status) => {
    if (status === "PENDING") {
      return statusClassName.pending;
    }
  };
  const handleStatusTitle = (status) => {
    if (status === "PENDING") {
      return statusTitle.pending;
    }
  };
  useEffect(() => {
    if (isLoading || isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
    if (orders && orders.length === 0) {
      setEmptyList("Empty order list");
    } else {
      setEmptyList(null);
    }
  }, [isLoading, isFetching]);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  return (
    <div className="admin-order-list">
      {isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
        </>
      ) : (
        <>
          {orders.map((order) => (
            <Link key={order.orders.orderId} to="/dashboard/admin/order/detail">
              <div>
                <strong>{order.orders.fullname}'s Order</strong>
                <p>{order.orders.orderDetails.length} items</p>
              </div>
              <p>$100.00</p>
              <span className={handleOrderStatusClassName(order.orders.status)}>
                Status: {handleStatusTitle(order.orders.status)}
              </span>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
