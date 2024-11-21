import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/modal/modal.css";
// import components
import { KoiHistory } from "./KoiHistory";
// import assets
// import redux
import { useDispatch, useSelector } from "react-redux";
// import slices
import {
  toggleDelKoiModal,
  toggleDetailKoiModal,
  toggleKoiHistoryOn,
  toggleUpdateKoiModal,
} from "../../redux/slices/modal/modal";
import * as KoiService from "../../service/koi/koiService";
export const KoiDetail = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const isToggleKoiHistory = useSelector(
    (state) => state.modal.koiHistoryModal.isToggleModal
  );
  const koiId = useSelector((state) => state.koi.koiId.koiId);
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [guideText, setGuideText] = useState(null);
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

  // recommendation
  const feedingGuides = (age, recommendedFoodAmount) => {
    const foodAmount =
      typeof recommendedFoodAmount === "number"
        ? recommendedFoodAmount.toFixed(2)
        : "0.00";

    if (age < 1) {
      return `For koi under 1 year of age, we recommend feeding them approximately ${foodAmount} grams of high-protein pellets per day. Younger koi are growing rapidly, so providing them with a nutrient-dense diet is essential.`;
    } else if (age >= 1 && age < 2) {
      return `At this stage, koi require about ${foodAmount} grams of pellets daily, as their growth slows slightly compared to their first year. It's crucial to balance their diet with protein-rich foods to support muscle development and maintain vibrant colors.`;
    } else {
      return `Koi over 2 years of age should be fed approximately ${foodAmount} grams of pellets per day. As adult koi grow at a slower pace, it’s important to prevent overfeeding while still offering them high-quality food. Incorporate vegetables and fruits to ensure a balanced diet, and keep an eye on water quality to maintain a healthy environment for your koi.`;
    }
  };
  const importantGuides = (age) => {
    if (age < 1) {
      return "Young koi are in a crucial growth phase, requiring a nutrient-dense diet to support their rapid development. It's beneficial to offer high-protein pellets along with soft fruits such as watermelon and leafy vegetables during warmer months. This variety helps maintain their health and encourages robust growth.";
    } else if (age >= 1 && age < 2) {
      return "At this stage, koi experience a slight slowdown in growth. It's essential to maintain a balanced diet that includes protein-rich foods to support muscle development and vibrant coloration. Introducing vegetables like lettuce and peas can enhance their diet while ensuring they remain healthy and active.";
    } else {
      return "Adult koi grow at a slower rate, so it’s important to avoid overfeeding. High-quality pellets should be supplemented with vegetables and fruits to ensure a balanced diet. Regularly monitor water quality to maintain a healthy environment, and adjust feeding based on their activity levels and seasonal changes.";
    }
  };

  // calulator
  const calculateKoiAge = (createDate) => {
    const today = new Date();
    const created = new Date(createDate);
    const age = today.getFullYear() - created.getFullYear();
    return age;
  };

  const calculateFoodAmount = (
    age = 0,
    weight = 0,
    sex = "Female",
    type = "Kohaku",
    origin = "Japan"
  ) => {
    let baseAmount = 0;

    if (age <= 1) baseAmount = weight * 0.05;
    else if (age <= 2) baseAmount = weight * 0.03;
    else baseAmount = weight * 0.01;
    if (sex === "Female") baseAmount *= 1.1;

    const typeAdjustment = {
      Kohaku: 1.05,
      Sanke: 1.05,
      Showa: 1.05,
      Tancho: 1.04,
      Asagi: 1.03,
      Shusui: 1.03,
      Utsurimono: 1.02,
      Bekko: 1.02,
      Goshiki: 1.03,
      Koromo: 1.03,
    };
    baseAmount *= typeAdjustment[type] || 1;

    const originAdjustment = {
      Japan: 1.1,
      China: 1.05,
      Indonesia: 1.05,
      Thailand: 1.04,
      Vietnam: 1.03,
      "South Korea": 1.03,
    };
    baseAmount *= originAdjustment[origin] || 1;

    return baseAmount;
  };

  const koiAge = koiInfo.createDate ? calculateKoiAge(koiInfo.createDate) : 0;
  const koiWeight = koiInfo?.koiGrowthLogs?.length
    ? koiInfo.koiGrowthLogs[koiInfo?.koiGrowthLogs?.length - 1].weight * 1000
    : 0;
  const koiSex = koiInfo.sex ? "Male" : "Female";
  const koiType = koiInfo.type || "Kohaku";
  const koiOrigin = koiInfo.origin || "Japan";
  // Calculate recommended food amount
  const recommendedFoodAmount = calculateFoodAmount(
    koiAge,
    koiWeight,
    koiSex,
    koiType,
    koiOrigin
  );
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
      setGuideText(feedingGuides(koiAge, recommendedFoodAmount));
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isFetching, isLoading, isError, guideText]);
  // handle func
  const handeToggleKoiHistoryModalOn = () => {
    dispatch(toggleKoiHistoryOn());
  };
  const handleToggleKoiDetailModal = () => {
    dispatch(toggleDetailKoiModal());
  };
  const handleToggleDelKoiModal = () => {
    dispatch(toggleDelKoiModal());
    // dispatch(toggleDetailKoiModalOff());
  };
  const handleToggleUpdateKoiModal = () => {
    dispatch(toggleUpdateKoiModal());
    // dispatch(toggleDetailKoiModalOff());
  };
  return (
    <div className="koi-detail-container">
      {isToggleKoiHistory && <KoiHistory />}
      <div className="koi-detail-modal">
        {serverError ? (
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
            <div className="koi-detail-header">
              <strong>Koi Detail #{koiInfo.koiId}</strong>
              <i className="bx bx-x" onClick={handleToggleKoiDetailModal}></i>
            </div>
            <div className="koi-detail-info">
              <img src={koiInfo.image} alt="" />
              <div className="koi-detail-info-header">
                <div>
                  <strong>Koi Infomation</strong>
                  <p>View all infomation of your koi</p>
                </div>
                <span onClick={handeToggleKoiHistoryModalOn}>
                  View info history
                </span>
              </div>
              <div className="koi-detail-main">
                <div className="koi-info">
                  <strong>First date in pond</strong>
                  <p>
                    {new Date(koiInfo.createDate).toLocaleDateString() ||
                      "Date not available"}
                  </p>
                </div>
                <div className="koi-info">
                  <strong>Name</strong>
                  <p>{koiInfo.name}</p>
                </div>
                <div className="koi-info">
                  <strong>Sex</strong>
                  <p>{koiInfo.sex ? "Male" : "Female"}</p>
                </div>
                <div className="koi-info">
                  <strong>Type</strong>
                  <p>{koiInfo.type}</p>
                </div>
                <div className="koi-info">
                  <strong>Origin</strong>
                  <p>{koiInfo.origin}</p>
                </div>
              </div>
              <div className="koi-detail-recommendation">
                <div className="recommendation">
                  <div className="koi-food">
                    <strong>Feeding Guidelines</strong>
                  </div>
                  <span>{guideText}</span>
                </div>
                <div className="recommendation">
                  <div className="koi-food">
                    <strong>Important</strong>
                  </div>
                  <span>{importantGuides(koiAge)}</span>
                </div>
                <div className="recommendation-product">
                  <div>
                    <strong>Recommended Product</strong>
                    <p>We suggest some product for you</p>
                  </div>
                  <span onClick={handeToggleKoiHistoryModalOn}>
                    View product suggest
                  </span>
                </div>
                <div className="utils">
                  <button onClick={handleToggleUpdateKoiModal}>Update</button>
                  <button onClick={handleToggleDelKoiModal}>Delete</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
