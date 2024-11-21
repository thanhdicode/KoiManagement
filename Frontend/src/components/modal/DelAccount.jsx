import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleDeleteAccountModal } from "../../redux/slices/modal/modal";
// import service
import * as AccountService from "../../service/account/AccountService";
export const DelAccount = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const userId = useSelector((state) => state.account.userId.userId);
  //   mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["del-account", userId],
    mutationFn: AccountService.deleteAccount,
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
        location.reload();
      }, 1500);
      queryCilent.invalidateQueries(["accounts"]);
    },
  });
  //   handle func
  const handleToggleDelAccountModal = () => {
    dispatch(toggleDeleteAccountModal());
  };
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(userId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="del-account-containter">
      <ToastContainer />
      <div className="del-account-modal">
        <div className="del-account-header">
          <strong>Delete Account</strong>
          <i className="bx bx-x" onClick={handleToggleDelAccountModal}></i>
        </div>
        <div className="del-account-main">
          <p>Are you sure to delete this account #{userId}</p>
        </div>
        <div className="submit">
          <button onClick={handleDeleteAccount}>Delete Confirm</button>
        </div>
      </div>
    </div>
  );
};
