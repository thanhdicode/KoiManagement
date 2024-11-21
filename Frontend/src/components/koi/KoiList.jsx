import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// import styles
import "../../styles/components/koi/koi.css";
// import assets
// import redux
import { useDispatch } from "react-redux";
// import slices
import { setKoiId } from "../../redux/slices/koi/koi";
import {
  toggleDetailKoiModal,
  toggleKoiHistoryOff,
} from "../../redux/slices/modal/modal";
// import service
import * as PondService from "../../service/pond/pondService";
export const KoiList = () => {
  // param
  const { pondId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  // handle func
  const handleToggleKoiDetailModal = (koiId) => {
    dispatch(setKoiId(koiId));
    dispatch(toggleDetailKoiModal());
    dispatch(toggleKoiHistoryOff());
  };
  //query
  const {
    data: pondInfo = {},
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["kois", pondId],
    queryFn: () => PondService.detailPondService(pondId),
  });
  // handle func
  const calculateAge = (createDate) => {
    const today = new Date();
    const birthDate = new Date(createDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (pondInfo && pondInfo.kois && pondInfo.kois.length === 0) {
      setEmptyList("Koi list is empty");
    } else {
      setEmptyList(null);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isFetching, isLoading,isError]);
  return (
    <table className="koi-list-table">
      <thead>
        <tr>
          <td>Infomation</td>
          <td>Age</td>
          <td>Sex</td>
          <td>Type</td>
          <td>Origin</td>
        </tr>
      </thead>
      <tbody>
      {serverError ? (
        <>
          <div className="error-page">
            <p>Server is closed now</p>
          </div>
        </>
      ) :(
        <>
{isLoadingPage ? (
          <>
            <div className="loading">
              <ClipLoader color="#000000" size={35} />
            </div>
          </>
        ) : (
          <>
            {emptyList && (
              <div className="empty-list">
                <p>{emptyList}</p>
              </div>
            )}
            {pondInfo &&
              pondInfo.kois &&
              pondInfo.kois.map((koi) => (
                <tr
                  key={koi.koiId}
                  onClick={() => handleToggleKoiDetailModal(koi.koiId)}
                >
                  <th>
                    <img src={koi.image} alt="" />
                    <div>
                      <strong>{koi.name}</strong>
                      <p>#{koi.koiId}</p>
                    </div>
                  </th>
                  <th>{calculateAge(koi.createDate)} years</th>
                  <th>{koi.sex ? "Male" : "Female"}</th>
                  <th>{koi.type}</th>
                  <th>{koi.origin}</th>
                </tr>
              ))}
          </>
        )}
        </>
      )}
      </tbody>
    </table>
  );
};
