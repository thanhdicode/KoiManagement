import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleAccountModal } from "../../redux/slices/modal/modal";
// import service
import * as AccountService from "../../service/account/AccountService";
export const AddAccountAdmin = () => {
  // dispatch
  const dispatch = useDispatch();
  //   state
  const [submitData, setSubmitData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  //   mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["addAccount"],
    mutationFn: AccountService.createAccountAdmin,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: (response) => {
      if (response && response.code === "EMAIL_EXISTED") {
        toast.error("This email is existed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.success("Add account success", {
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
      }

      queryClient.invalidateQueries(["accounts"]);
    },
  });
  // handle func
  const handleToggleAddAccountModal = () => {
    dispatch(toggleAccountModal());
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (isPreventSubmit) {
      toast.error("On going process, try again later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (!submitData.email || !submitData.email || !submitData.email) {
      toast.error("Please input all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (!emailPattern.test(submitData.email)) {
      toast.error("Invalid email pattern!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (submitData.password.length < 9) {
      toast.error("Password must be  at least 9 characters", {
        position: "top-right",
        autoClose: 5000,
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
      console.log(error);
    }
  };
  return (
    <div className="add-account-container">
      <ToastContainer />
      <div className="add-account-modal">
        <div className="add-account-header">
          <strong>Add Account(for Admin)</strong>
          <i className="bx bx-x" onClick={handleToggleAddAccountModal}></i>
        </div>
        <form action="" onSubmit={handleOnSubmit} className="add-account-form">
          <div className="input-item">
            <label htmlFor="fullname">Full name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter full name"
              name="fullname"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter email"
              name="email"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-item">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              placeholder="Enter password"
              name="password"
              onChange={handleOnChange}
            />
          </div>
          <div className="submit">
            <button onClick={handleToggleAddAccountModal}>Cancel</button>
            <button>Add confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
