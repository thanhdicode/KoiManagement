import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/myorder/myorder.css";
// import service
import * as OrderService from "../../service/order/order";
import ClipLoader from "react-spinners/ClipLoader";
export const MyOrderList = () => {
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
    data: myOrders = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: OrderService.getOwnOrders,
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
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
    if (myOrders && myOrders.length === 0) {
      setEmptyList("Your orders is empty");
    } else {
      setEmptyList(null);
    }
  }, [isFetching, isLoading, isError]);
  return (
    <div className="myorder-list">
      {isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
        </>
      ) : serverError ? (
        <>
          <div className="server-error">
            <p>{serverError}</p>
          </div>
        </>
      ) : emptyList ? (
        <>
          <div className="empty">
            <p>{emptyList}</p>
          </div>
        </>
      ) : (
        <>
          {myOrders.map((order) => (
            <Link key={order.orders.orderId} to="/dashboard/myorder/detail">
              <div>
                <strong>My Order</strong>
                <p>{order.orders.orderDetails.length} items</p>
              </div>
              <p>$225.00</p>
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
