import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleUpdatePondModal } from "../../redux/slices/modal/modal";
// import dispatch
import { useDispatch } from "react-redux";
// import service
import * as PondService from "../../service/pond/pondService";
export const UpdatePond = () => {
  // param
  const { pondId } = useParams();
  // query
  const {
    data: pondInfo = {},
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pond-detail", pondId],
    queryFn: () => PondService.detailPondService(pondId),
  });
  // dispatch
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [validNumber, setValidNumber] = useState(false);
  const [submitData, setSubmitData] = useState({
    image: "",
    pondName: "",
    pumpPower: "",
    size: "",
    depth: "",
    volume: "",
    vein: "",
  });
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-pond", pondId],
    mutationFn: (updatedData) =>
      PondService.updatePondService(pondId, updatedData),
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
        queryKey: ["update-pond"],
      });
    },
  });
  useEffect(() => {
    if (pondInfo && pondInfo.image) {
      setPreviewImage(pondInfo.image);
    }
    if (pondInfo) {
      setSubmitData({
        image: pondInfo.image || "",
        pondName: pondInfo.pondName || "",
        pumpPower: pondInfo.pumpPower || "",
        size: pondInfo.size || "",
        depth: pondInfo.depth || "",
        volume: pondInfo.volume || "",
        vein: pondInfo.vein || "",
      });
    }
  }, [pondInfo]);
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
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      image: "",
    });
  };
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdatePondModal());
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleInputNumberPond = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setValidNumber(true);
      return;
    }

    if (value > 10000) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setValidNumber(true);
      return;
    }
    setSubmitData({
      ...submitData,
      [name]: parseInt(value),
    });
    setValidNumber(false);
  };
  const handleInputFloatPond = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setValidNumber(true);
      return;
    }

    if (value > 10000) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setValidNumber(true);
      return;
    }

    setSubmitData({
      ...submitData,
      [name]: parseFloat(value),
    });
    setValidNumber(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submitData.pondName || !submitData.image) {
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
    if (validNumber) {
      toast.error("Invalid number", {
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
    <div className="update-pond-container">
      <ToastContainer />
      <div className="update-pond-modal">
        <div className="update-pond-header">
          <strong>Update Pond</strong>
          <i className="bx bx-x" onClick={handleToggleUpdatePondModal}></i>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          autoComplete="off"
          className="update-pond-form"
        >
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
              src=""
              alt=""
              onChange={(e) => resizeFile(e.target.files[0])}
            />
          </div>

          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="pondName">Pond Name</label>
              <input
                type="text"
                id="pondName"
                placeholder="Pond name"
                name="pondName"
                onChange={handleOnChange}
                defaultValue={pondInfo && pondInfo.pondName}
              />
            </div>
            <div className="input-field">
              <label htmlFor="pumpPower">Pump Power (W)</label>
              <input
                type="text"
                id="pumpPower"
                placeholder="Pump power (W)"
                name="pumpPower"
                onChange={handleInputFloatPond}
                defaultValue={pondInfo && pondInfo.pumpPower}
              />
            </div>
          </div>

          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="size">Size (m²)</label>
              <input
                type="text"
                id="size"
                placeholder="Size (m²)"
                name="size"
                onChange={handleInputFloatPond}
                defaultValue={pondInfo && pondInfo.size}
              />
            </div>
            <div className="input-field">
              <label htmlFor="depth">Depth (m)</label>
              <input
                type="text"
                id="depth"
                placeholder="Depth (m)"
                name="depth"
                onChange={handleInputFloatPond}
                defaultValue={pondInfo && pondInfo.depth}
              />
            </div>
          </div>

          <div className="input-two-fields">
            <div className="input-field">
              <label htmlFor="volume">Volume (L)</label>
              <input
                type="text"
                id="volume"
                placeholder="Volume (L)"
                name="volume"
                onChange={handleInputFloatPond}
                defaultValue={pondInfo && pondInfo.volume}
              />
            </div>
            <div className="input-field">
              <label htmlFor="vein">Number of Veins</label>
              <input
                type="text"
                id="vein"
                placeholder="Number of veins"
                name="vein"
                onChange={handleInputNumberPond}
                defaultValue={pondInfo && pondInfo.vein}
              />
            </div>
          </div>

          <div className="submit">
            <button onClick={handleToggleUpdatePondModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
