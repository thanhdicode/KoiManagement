import React, { useEffect, useState } from "react";
// import styles
import { useQuery } from "@tanstack/react-query";
import "../../styles/components/modal/modal.css";
// import chart
import { SizeLineChart } from "../../chart/SizeLineChart";
import { WeightLineChart } from "../../chart/WeightLineChart";
// import slices
import {
  toggleKoiHistoryModal,
  toggleKoiLogModal,
} from "../../redux/slices/modal/modal";
// import redux
import { useDispatch, useSelector } from "react-redux";
// import service
import ClipLoader from "react-spinners/ClipLoader";
import * as KoiService from "../../service/koi/koiService";
export const KoiHistory = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const koiId = useSelector((state) => state.koi.koiId.koiId);
  // state
  const [isEmptyLog, setIsEmptyLog] = useState(false);
  const [koiLogList, setKoiLogList] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  // query
  const {
    data: koiInfo = {},
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["koi-detail", koiId],
    queryFn: () => KoiService.detailKoiService(koiId),
  });
  // handle func
  const handleToggleKoiHistoryModal = () => {
    dispatch(toggleKoiHistoryModal());
  };
  const handleToggleKoiLogModal = () => {
    dispatch(toggleKoiLogModal());
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

    if (koiInfo && koiInfo.koiGrowthLogs) {
      if (koiInfo.koiGrowthLogs.length === 0) {
        setIsEmptyLog(true);
      } else {
        setIsEmptyLog(false);
        setKoiLogList(koiInfo.koiGrowthLogs);
      }
    }
  }, [koiInfo, isLoading, isFetching, isError]);
  return (
    <div className="koi-history-modal">
      {isEmptyLog ? (
        <>
          <div className="empty-log">
            <strong>No growth history available for this koi yet.</strong>
            <p>
              Start tracking the growth by adding the koi's size and weight!
            </p>
            <button onClick={handleToggleKoiLogModal}>Add Growth Data</button>
          </div>
        </>
      ) : serverError ? (
        <div className="error-page">
          <p>{serverError}</p>
        </div>
      ) : isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={35} />
          </div>
        </>
      ) : (
        <>
          <div className="koi-history-header">
            <strong>Growth Data</strong>
            <i className="bx bx-x" onClick={handleToggleKoiHistoryModal}></i>
          </div>
          <div className="koi-history-chart">
            <WeightLineChart koiGrowthLogs={koiLogList} />
            <SizeLineChart koiGrowthLogs={koiLogList} />
          </div>
          <div className="koi-history-main">
            <div className="header">
              <div>
                <strong>Koi Growth History</strong>
                <p>System will show growth history of your Koi</p>
              </div>
              <span onClick={handleToggleKoiLogModal}>Update new data</span>
            </div>
            <table className="history">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Last Update</th>
                  <th>Size</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {koiLogList.map((log, index) => (
                  <tr key={log.koiLogId}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(log.koiLogDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      {log.logTime}
                    </td>
                    <td>{log.size}cm</td>
                    <td>{log.weight}kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};
