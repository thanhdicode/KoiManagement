import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../../styles/dashboard/setting/setting.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
// import service
import * as AccountService from "../../../service/account/AccountService";
export const UserSetting = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // query
  const {
    data: myInfo,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["my-info"],
    queryFn: AccountService.getMyUserInfo,
    refetchOnWindowFocus: false,
  });
  // state
  const [isToggleChangePass, setIsToggleChangePass] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [submitData, setSubmitData] = useState({
    fullname: myInfo && myInfo.fullname,
    phone: myInfo && myInfo.phone,
    address: myInfo && myInfo.address,
  });
  const [submitPassData, setSubmitPassData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-info"],
    mutationFn: AccountService.updateMyInfo,
    onSuccess: (responseData) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...user, ...responseData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Update Infomation Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // setTimeout(() => {
      //   location.reload();
      // }, 1500);

      queryClient.invalidateQueries({
        queryKey: ["my-info"],
      });
    },
  });
  const updatePassMutation = useMutation({
    mutationKey: ["update-pass"],
    mutationFn: AccountService.updatePassword,
    onSuccess: (response) => {
      if (response && response.code === "WRONG_PASSWORD") {
        toast.error("Wrong current password", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.success("Update Password Successfully", {
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
    },
  });
  // handle func
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (!isToggleChangePass) {
      setSubmitPassData({
        oldPassword: "",
        confirmPassword: "",
        newPassword: "",
      });
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isToggleChangePass, isFetching, isLoading, isError]);

  // handle func
  const handleToggleChangePassTrue = () => {
    setIsToggleChangePass(true);
  };

  const handleToggleChangePassFalse = () => {
    setIsToggleChangePass(false);
  };
  const handleOnChangePass = (e) => {
    const { name, value } = e.target;
    setSubmitPassData({
      ...submitPassData,
      [name]: value,
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleOnSubmitPass = async (e) => {
    e.preventDefault();
    if (
      !submitPassData.confirmPassword ||
      !submitPassData.newPassword ||
      !submitPassData.oldPassword
    ) {
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
    if (submitPassData.newPassword !== submitPassData.confirmPassword) {
      toast.error("Password and Confirm Password must be the same", {
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
      await updatePassMutation.mutateAsync(submitPassData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnSubmitInfo = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-setting-container">
      <Dashnav />
      <ToastContainer />
      <div className="user-setting">
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
            <div className="setting-header">
              <strong>{myInfo && myInfo.fullname}'s setting</strong>
            </div>
            <form
              action=""
              onSubmit={handleOnSubmitInfo}
              autoComplete="off"
              className="profile-form"
            >
              <div className="header">
                <strong>Profile Setting</strong>
                <p>You can customize your account infomation</p>
              </div>
              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  disabled
                  defaultValue={myInfo && myInfo.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className="item">
                <label htmlFor="fullname">Your name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  defaultValue={myInfo && myInfo.fullname}
                  placeholder="Enter your full name"
                  onChange={handleOnChange}
                />
              </div>
              <div className="item">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={myInfo && myInfo.phone}
                  placeholder="Enter your phone number"
                  onChange={handleOnChange}
                />
              </div>
              <div className="item">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={myInfo && myInfo.address}
                  placeholder="Enter your address"
                  onChange={handleOnChange}
                />
              </div>
              <button>Update Infomation</button>
            </form>
            {user.googleAccount ? (
              ""
            ) : (
              <form
                action=""
                onSubmit={handleOnSubmitPass}
                autoComplete="off"
                className="security-form"
              >
                <div className="header">
                  <div>
                    <strong>Security Setting</strong>
                    <p>You can change your sensitive infomation</p>
                  </div>
                  {isToggleChangePass ? (
                    <span id="disable" onClick={handleToggleChangePassFalse}>
                      Disable change password
                    </span>
                  ) : (
                    <span id="enable" onClick={handleToggleChangePassTrue}>
                      Enable change password
                    </span>
                  )}
                </div>

                <div className="item">
                  <label htmlFor="recent">Recent password</label>
                  <input
                    type="password"
                    id="recent"
                    name="oldPassword"
                    placeholder="Your recent password"
                    value={submitPassData.oldPassword}
                    onChange={handleOnChangePass}
                    disabled={!isToggleChangePass} // Enable/disable based on toggle state
                  />
                </div>
                <div className="item">
                  <label htmlFor="newpass">New password</label>
                  <input
                    type="password"
                    id="newpass"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={submitPassData.newPassword}
                    onChange={handleOnChangePass}
                    disabled={!isToggleChangePass}
                  />
                </div>
                <div className="item">
                  <label htmlFor="confirm">Confirm password</label>
                  <input
                    type="password"
                    id="confirm"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={submitPassData.confirmPassword}
                    onChange={handleOnChangePass}
                    disabled={!isToggleChangePass}
                  />
                </div>
                <button id="submit" disabled={!isToggleChangePass}>
                  Change Password
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
