import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import FileResizer from "react-image-file-resizer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import redux
import { useDispatch, useSelector } from "react-redux";
// import slices
import { toggleUpdateKoiModal } from "../../redux/slices/modal/modal";
// import service
import * as KoiService from "../../service/koi/koiService";
export const UpdateKoi = () => {
  const countryNameMap = {
    JP: "Japan",
    CN: "China",
    ID: "Indonesia",
    TH: "Thailand",
    VN: "Vietnam",
    KR: "South Korea",
  };
  const countryCodeMap = {
    Japan: "JP",
    China: "CN",
    Indonesia: "ID",
    Thailand: "TH",
    Vietnam: "VN",
    "South Korea": "KR",
  };
  //   dispatch
  const dispatch = useDispatch();
  // selector
  const koiId = useSelector((state) => state.koi.koiId.koiId);
  // query
  const {
    data: koiInfo = {},
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["koi-detail", koiId],
    queryFn: () => KoiService.detailKoiService(koiId),
  });
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFlag, setSelectedFlag] = useState("");
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [submitData, setSubmitData] = useState({
    image: "",
    name: "",
    sex: "",
    origin: "",
    type: "",
  });
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (koiInfo) {
      setSubmitData({
        image: koiInfo.image || "",
        name: koiInfo.name || "",
        sex: koiInfo.sex || "",
        origin: koiInfo.origin || "",
        type: koiInfo.type || "",
      });
    }
    if (koiInfo && koiInfo.image) {
      setPreviewImage(koiInfo.image);
    }
  }, [koiInfo, isFetching, isLoading]);
  //   file resizer
  const resizeFile = (file) => {
    FileResizer.imageFileResizer(
      file,
      300,
      300,
      "PNG",
      100,
      0,
      (uri) => {
        setPreviewImage(uri);
        setSubmitData({
          ...submitData,
          image: uri,
        });
      },
      "base64",
      250,
      250
    );
  };
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-koi", koiId],
    mutationFn: (updateData) => {
      KoiService.updateKoiService(koiId, updateData);
    },
    onSuccess: () => {
      toast.success("Update successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["update-koi"],
      });
    },
  });
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      image: "",
    });
  };

  const handleOnChangeName = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setIsValidName(true);
      return;
    }
    if (value.length < 10) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setIsValidName(true);
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: value,
    });
    setIsValidName(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleOnSelectFlag = (code) => {
    setSelectedFlag(code);
    setSubmitData((prevData) => ({
      ...prevData,
      origin: countryNameMap[code],
    }));
  };
  const getOriginCode = (origin) => countryCodeMap[origin] || "";
  const handleToggleUpdateKoiModal = () => {
    dispatch(toggleUpdateKoiModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submitData.image || !submitData.name || !submitData.type) {
      toast.error("Please input all fields", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="update-koi-container">
      <ToastContainer />
      <div className="update-koi-modal">
        <div className="update-koi-header">
          <strong>Update A Koi</strong>
          <i className="bx bx-x" onClick={handleToggleUpdateKoiModal}></i>
        </div>
        <form action="" onSubmit={handleSubmit} className="update-koi-form">
          <div className="input-image">
            <i className="bx bx-trash-alt" onClick={removeChooseImage}></i>

            {previewImage ? (
              <label htmlFor="img">
                <img src={previewImage} alt="" />
              </label>
            ) : (
              <label htmlFor="img">
                <i className="bx bx-image-add"></i>
                <p>Choose An Image</p>
              </label>
            )}

            <input
              type="file"
              id="img"
              onChange={(e) => resizeFile(e.target.files[0])}
            />
          </div>

          <div className="input-item">
            <label htmlFor="koiname">Koi Name</label>
            <input
              type="text"
              id="koiname"
              name="name"
              defaultValue={koiInfo.name}
              onChange={handleOnChangeName}
              placeholder="Koi name"
            />
          </div>

          <div className="select-two-fields">
            <div className="select">
              <label htmlFor="koi-type">Select Type</label>
              <select
                name="type"
                onChange={handleOnChange}
                defaultValue={koiInfo.type}
                id="koi-type"
              >
                <option value="">Type</option>
                <option value="Kohaku">Kohaku</option>
                <option value="Sanke">Sanke</option>
                <option value="Showa">Showa</option>
                <option value="Tancho">Tancho</option>
                <option value="Asagi">Asagi</option>
                <option value="Shusui">Shusui</option>
                <option value="Utsurimono">Utsurimono</option>
                <option value="Bekko">Bekko</option>
                <option value="Goshiki">Goshiki</option>
                <option value="Koromo">Koromo</option>
              </select>
              <i className="bx bxs-chevron-down"></i>
            </div>

            <div className="select">
              <label htmlFor="koi-sex">Select Gender</label>
              <select
                name="sex"
                defaultValue={koiInfo.sex ? "true" : "false"}
                onChange={handleOnChange}
                id="koi-sex"
              >
                <option value="">Gender</option>
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
              <i className="bx bxs-chevron-down"></i>
            </div>
          </div>

          <div className="input-item">
            <label htmlFor="origin">Origin</label>
            <ReactFlagsSelect
              selected={getOriginCode(submitData.origin)}
              onSelect={handleOnSelectFlag}
              placeholder="Select origin"
              countries={["JP", "CN", "ID", "TH", "VN", "KR"]}
              className="menu-flags"
            />
          </div>

          <div className="submit">
            <button type="button" onClick={handleToggleUpdateKoiModal}>
              Cancel
            </button>
            <button type="submit">Update Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
