import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import redux
import { useDispatch } from "react-redux";
// import slices
import { toggleDelPondModal } from "../../redux/slices/modal/modal";
// import service
import * as PondService from "../../service/pond/pondService";
export const DelPond = () => {
  // navigation
  const navigate = useNavigate();
  // param
  const { pondId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationFn: PondService.deletePondService,
    onSuccess: () => {
      toast.success("Delete successfully", {
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
        dispatch(toggleDelPondModal());
        navigate("/dashboard/mypond/");
        location.reload();
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["delete-pond"],
      });
    },
  });
  // handle func
  const handleToggleDelPondModal = () => {
    dispatch(toggleDelPondModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(pondId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="del-pond-containter">
      <ToastContainer />
      <div className="del-pond-modal">
        <div className="del-pond-header">
          <strong>Delete Pond</strong>
          <i className="bx bx-x" onClick={handleToggleDelPondModal}></i>
        </div>
        <div className="del-pond-main">
          <p>Are you sure to delete Pond #{pondId}</p>
        </div>
        <div className="submit">
          <button onClick={handleSubmit}>Delete Confirm</button>
        </div>
      </div>
    </div>
  );
};
