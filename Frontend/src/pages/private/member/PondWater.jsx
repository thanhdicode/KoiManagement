import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../../styles/dashboard/pondwater/pondwater.css";
// import redux
import { useDispatch } from "react-redux";
// import slices
import { toggleUpdateWaterModal } from "../../../redux/slices/modal/modal";
// import service
import * as PondService from "../../../service/pond/pondService";
export const PondWater = () => {
  const statusClassName = {
    good: "good",
    moderate: "moderate",
    poor: "poor",
  };
  const statusWaterTitle = {
    good: "Good Condition",
    moderate: "Moderate Condition",
    poor: "Poor Condition",
  };
  // import dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleUpdateWaterModal = () => {
    dispatch(toggleUpdateWaterModal());
  };
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
  }, [isFetching, isLoading, isError]);
  // handle func
  const calculateAdjustment = (param, idealMin, idealMax) => {
    if (param >= idealMin && param <= idealMax) {
      return { adjustment: 0, message: "No adjustment needed." };
    }
    if (param < idealMin) {
      return {
        adjustment: idealMin - param,
        message: `You need to increase by ${idealMin - param}`,
      };
    }
    if (param > idealMax) {
      return {
        adjustment: param - idealMax,
        message: `You need to decrease by ${param - idealMax}`,
      };
    }
  };

  const calculateParamStatus = (param, idealMin, idealMax) => {
    if (param >= idealMin && param <= idealMax) return statusClassName.good;
    if (
      (param >= idealMin - 1 && param < idealMin) ||
      (param > idealMax && param <= idealMax + 1)
    )
      return statusClassName.moderate;
    return statusClassName.poor;
  };

  const calculateParamTitle = (param, idealMin, idealMax) => {
    if (param >= idealMin && param <= idealMax) return statusWaterTitle.good;
    if (
      (param >= idealMin - 1 && param < idealMin) ||
      (param > idealMax && param <= idealMax + 1)
    )
      return statusWaterTitle.moderate;
    return statusWaterTitle.poor;
  };

  const oxygenAdjustment = calculateAdjustment(pondInfo?.waterParam?.o2, 7, 9);
  const no2Adjustment = calculateAdjustment(pondInfo?.waterParam?.no2, 0, 0.5);
  const no3Adjustment = calculateAdjustment(pondInfo?.waterParam?.no3, 0, 20);
  const nh4Adjustment = calculateAdjustment(pondInfo?.waterParam?.nh4, 0, 0.2);
  const temperatureAdjustment = calculateAdjustment(
    pondInfo?.waterParam?.temperature,
    20,
    28
  );
  const saltAdjustment = calculateAdjustment(
    pondInfo?.waterParam?.salt,
    0.1,
    0.3
  );
  const phAdjustment = calculateAdjustment(pondInfo?.waterParam?.ph, 7, 8);

  return (
    <div className="pond-water-container">
      {serverError ? (
        <div className="error-page">
          <p>{serverError}</p>
        </div>
      ) : isLoadingPage ? (
        <div className="loading">
          <ClipLoader color="#000000" size={40} />
        </div>
      ) : (
        <>
          <div className="pond-water-header">
            <div className="header">
              <strong>Water quality</strong>
              <p>View detail all parameters of water quality</p>
            </div>
            <div
              className="update-water"
              onClick={handleToggleUpdateWaterModal}
            >
              <i className="bx bxs-edit-alt"></i>
              <p>Update water quality</p>
            </div>
          </div>
          <div className="pond-water-list">
            <div className="pond-water-param">
              <strong>Lastest update</strong>
              <p>
                {new Date(
                  pondInfo &&
                    pondInfo.waterParam &&
                    pondInfo.waterParam.createDate
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="pond-water-param">
              <strong>O2</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.o2}
                mg/L
              </p>
            </div>
            <div className="pond-water-param">
              <strong>NO2</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.no2}
                mg/L
              </p>
            </div>
            <div className="pond-water-param">
              <strong>NO3</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.no3}
                mg/L
              </p>
            </div>
            <div className="pond-water-param">
              <strong>NH3/NH4</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.nh4}
                mg/L
              </p>
            </div>
            <div className="pond-water-param">
              <strong>Temparature</strong>
              <p>
                {pondInfo &&
                  pondInfo.waterParam &&
                  pondInfo.waterParam.temperature}
                ℃
              </p>
            </div>
            <div className="pond-water-param">
              <strong>Salt</strong>
              <p>
                {pondInfo && pondInfo.waterParam && pondInfo.waterParam.salt}%
              </p>
            </div>
            <div className="pond-water-param">
              <strong>pH</strong>
              <p>{pondInfo && pondInfo.waterParam && pondInfo.waterParam.ph}</p>
            </div>
          </div>
          <div className="pond-water-recommendation-header">
            <strong>Recommendation</strong>
            <p>
              Let’s our system calculate ideal water parameter for your ponds
            </p>
          </div>
          <div className="pond-water-recommendation">
            <div
              className={`recommendation-param ${calculateParamStatus(
                pondInfo?.waterParam?.o2,
                7,
                9
              )}`}
            >
              <strong>
                O2 ({calculateParamTitle(pondInfo?.waterParam?.o2, 7, 9)})
              </strong>
              <p>{oxygenAdjustment?.message}</p>
            </div>
            <div
              className={`recommendation-param ${calculateParamStatus(
                pondInfo?.waterParam?.no2,
                0,
                0.5
              )}`}
            >
              <strong>
                NO2 ({calculateParamTitle(pondInfo?.waterParam?.no2, 0, 0.5)})
              </strong>
              <p>{no2Adjustment?.message}</p>
            </div>
            <div
              className={`recommendation-param ${calculateParamStatus(
                pondInfo?.waterParam?.no3,
                0,
                20
              )}`}
            >
              <strong>
                NO3 ({calculateParamTitle(pondInfo?.waterParam?.no3, 0, 20)})
              </strong>
              <p>{no3Adjustment?.message}</p>
            </div>
            <div
              className={`recommendation-param ${calculateParamStatus(
                pondInfo?.waterParam?.nh4,
                0,
                0.2
              )}`}
            >
              <strong>
                NH3/NH4 (
                {calculateParamTitle(pondInfo?.waterParam?.nh4, 0, 0.2)})
              </strong>
              <p>{nh4Adjustment?.message}</p>
            </div>
            <div
              className={`recommendation-param ${calculateParamStatus(
                pondInfo?.waterParam?.temperature,
                20,
                28
              )}`}
            >
              <strong>
                Temperature (
                {calculateParamTitle(pondInfo?.waterParam?.temperature, 20, 28)}
                )
              </strong>
              <p>{temperatureAdjustment?.message}</p>
            </div>
            <div
              className={`recommendation-param ${calculateParamStatus(
                pondInfo?.waterParam?.salt,
                0.1,
                0.3
              )}`}
            >
              <strong>
                Saltt (
                {calculateParamTitle(pondInfo?.waterParam?.salt, 0.1, 0.3)})
              </strong>
              <p>{saltAdjustment?.message}</p>
            </div>
            <div
              className={`recommendation-param ${calculateParamStatus(
                pondInfo?.waterParam?.ph,
                7,
                8
              )}`}
            >
              <strong>
                pH ({calculateParamTitle(pondInfo?.waterParam?.ph, 7, 8)})
              </strong>
              <p>{phAdjustment?.message}</p>
            </div>
            <hr />
            <div className={`recommendation-param good`}>
              <strong>Recommend Product</strong>

              <a
                href="http://localhost:5173/shop/category/2"
                className="product-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Water improvement
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
