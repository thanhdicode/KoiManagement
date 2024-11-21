import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// import styles
import "../../../styles/dashboard/pondinfo/pondinfo.css";
// import assets
// import service
import * as PondService from "../../../service/pond/pondService";
export const PondInfo = () => {
  // param
  const { pondId } = useParams();
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    data: pondInfo = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["pond-detail", pondId],
    queryFn: () => PondService.detailPondService(pondId),
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




  }, [isFetching, isLoading,isError]);
  return (
    <div className="pond-info-container">
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
          <div className="pond-info-image">
            <img src={pondInfo && pondInfo.image} alt="" />
          </div>
          <div className="pond-info-header">
            <strong>Pond infomation</strong>
            <p>See detail about pond infomation</p>
          </div>
          <div className="pond-info-main">
            <div className="info-item">
              <strong>Name</strong>
              <p>{(pondInfo && pondInfo.pondName) || "null"}</p>
            </div>
            <div className="info-item">
              <strong>Pump power</strong>
              <p>{(pondInfo && pondInfo.pumpPower) || "null"}W</p>
            </div>
            <div className="info-item">
              <strong>Size</strong>
              <p>{(pondInfo && pondInfo.size) || "null"}m²</p>
            </div>
            <div className="info-item">
              <strong>Depth</strong>
              <p>{(pondInfo && pondInfo.depth) || "null"}m</p>
            </div>
            <div className="info-item">
              <strong>Volumn</strong>
              <p>
                {(pondInfo &&
                  Intl.NumberFormat("de-DE").format(pondInfo.volume)) ||
                  "null"}
                L
              </p>
            </div>
            <div className="info-item">
              <strong>Veins</strong>
              <p>{(pondInfo && pondInfo.vein) || "null"} veins</p>
            </div>
          </div>
        </>
      )}
        </>
      )}
    </div>
  );
};
