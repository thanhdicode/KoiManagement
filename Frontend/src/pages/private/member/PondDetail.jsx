import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// import styles
import "../../../styles/dashboard/ponddetail/ponddetail.css";
// import dispatch
import { useDispatch } from "react-redux";
// import slices
import { toggleDelPondModal, toggleUpdatePondModal } from "../../../redux/slices/modal/modal";
// import service
import * as PondService from "../../../service/pond/pondService";
export const PondDetail = () => {
  // param
  const { pondId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // state
  const [isNotFoundPond, setIsNotFoundPond] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: pondStatus,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["pond-detail", pondId],
    queryFn: () => PondService.detailPondService(pondId),
  });
  // handle func
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdatePondModal());
  };
  const handleToggleDelPondModal = () => {
    dispatch(toggleDelPondModal());
  };
  useEffect(() => {
    if (pondStatus && pondStatus.code === "POND_NOT_FOUND") {
      setIsNotFoundPond(true);
    } else {
      setIsNotFoundPond(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }


  }, [pondStatus, isFetching, isLoading, isError]);
  return (
    <div className="pond-detail-container">
      
      {serverError ? (
            <div className="error-page">
              <p>{serverError}</p>
            </div>
          ) : isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          ): isNotFoundPond ? (
        <>
          <div className="not-found">
            <h2>Pond is not found</h2>
            <p>Please check ID of pond or it had been delete !</p>
          </div>
        </>
      ) : (
        <>
          <div className="pond-detail-header">
            <strong>Pond Detail #{pondId}</strong>
            <div>
              <i
                className="bx bx-edit-alt"
                onClick={handleToggleUpdatePondModal}
              ></i>
              <i
                className="bx bx-trash-alt"
                onClick={handleToggleDelPondModal}
              ></i>
            </div>
          </div>
          <div className="pond-detail-link">
            <NavLink
              to={`/dashboard/mypond/detail/info/${pondId}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Infomation
            </NavLink>
            <NavLink
              to={`/dashboard/mypond/detail/water/${pondId}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Water
            </NavLink>
            <NavLink
              to={`/dashboard/mypond/detail/kois/${pondId}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Kois
            </NavLink>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};
