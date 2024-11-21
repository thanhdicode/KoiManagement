import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/pond/pond.css";
// import service
import * as PondService from "../../service/pond/pondService";
export const PondList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: ponds = [],
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["ponds", userId],
    queryFn: () => PondService.getUserPondService(userId),
    refetchOnWindowFocus: false,
  });
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
    if (ponds.length === 0) {
      setEmptyList("Pond list is empty");
    } else {
      setEmptyList(null);
    }
  }, [isFetching, isLoading, isError]);
  return (
    <div className="pond-list">
      {serverError ? (
        <>
          <div className="error-page">
            <p>Server is closed now</p>
          </div>
        </>
      ) : (
        <>
          {isLoadingPage ? (
            <>
              <div className="loading">
                <ClipLoader color="#000000" size={40} />
              </div>
            </>
          ) : (
            <>
              {emptyList && (
                <div className="empty-list">
                  <p>{emptyList}</p>
                </div>
              )}
              {ponds.map((pond) => (
                <Link
                  key={pond && pond.pondId}
                  to={`/dashboard/mypond/detail/info/${pond && pond.pondId}`}
                >
                  <img src={pond && pond.image} alt="" />
                  <div className="pond-info">
                    <div>
                      <strong>{pond && pond.pondName}</strong>
                      <p>{pond && pond.size}m²</p>
                      <p>
                        {pond && Intl.NumberFormat("de-DE").format(pond.volume)}
                        L
                      </p>
                    </div>
                    <p>{(pond && pond.kois && pond.kois.length) || "0"} Kois</p>
                    <span>Status: Good</span>
                  </div>
                </Link>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};
