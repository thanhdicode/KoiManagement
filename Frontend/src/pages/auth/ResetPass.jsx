import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
// import component
import { ModalSuccess } from "../../components/modal/ModalSuccess";
// import styles
import "../../styles/auth/auth.css";
// import assets
import coverImg from "../../assets/forget.jpg";
// import service
import * as AccountService from "../../service/account/AccountService";
// import slice
import { toggleSuccessModal } from "../../redux/slices/modal/modal";
export const ResetPass = () => {
  // selector
  const email = useSelector((state) => state.account.email.email);
  const isToggleSignupSuccess = useSelector(
    (state) => state.modal.successModal.isToggleModal
  );
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // state
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRepass, setVisibleRepass] = useState(false);
  const [requiredField, setRequiredField] = useState(null);
  const [numberOfPass, setNumberOfPass] = useState(null);
  const [validPass, setValidPass] = useState(null);
  const [submitData, setSubmitData] = useState({
    email: email,
    password: "",
    repass: "",
  });
  //   mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountService.resetPasswordService,
    onSuccess: () => {
      dispatch(toggleSuccessModal());
      setTimeout(() => {
        dispatch(toggleSuccessModal());
        navigate("/login");
      }, 2000);
      queryCilent.invalidateQueries({
        queryKey: ["reset-pass"],
      });
    },
  });
  // handlefunc
  const handleVisiblePass = () => {
    setVisiblePass(!visiblePass);
  };
  const handleVisibleRepass = () => {
    setVisibleRepass(!visibleRepass);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // required field validation
    if (!submitData.password || !submitData.repass) {
      setRequiredField("All fields are required");
      return;
    } else {
      setRequiredField(null);
    }
    // length of pass validation
    if (submitData.password.length < 9) {
      setNumberOfPass("Password must be at least 8 characters");
      return;
    } else {
      setNumberOfPass(null);
    }
    // valid password
    if (submitData.password !== submitData.repass) {
      setValidPass("Password and Confirm Password must be the same");
      return;
    } else {
      setValidPass(null);
    }
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {}
  };
  return (
    <div className="cover">
      {isToggleSignupSuccess && (
        <ModalSuccess
          title="Reset Successfully"
          message="You have reset your password, now system will redirect you to login page"
        />
      )}
      <img src={coverImg} alt="" />
      <div className="reset-container">
        <div className="reset-main">
          <div className="reset-header">
            <div>
              <strong>Reset Password</strong>
              <p>Now you can reset your password of account {email}</p>
            </div>
          </div>
          <form
            action=""
            onSubmit={handleSubmit}
            autoComplete="off"
            className="reset-form"
          >
            <div className="input-item">
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type={visiblePass ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                />
                {visiblePass ? (
                  <span
                    className="material-symbols-outlined"
                    onClick={handleVisiblePass}
                  >
                    visibility_off
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    onClick={handleVisiblePass}
                  >
                    visibility
                  </span>
                )}
              </div>
            </div>
            <div className="input-item">
              <label htmlFor="repass">Confirm password</label>
              <div>
                <input
                  type={visibleRepass ? "text" : "password"}
                  id="repass"
                  name="repass"
                  placeholder="Confirm password again"
                  onChange={handleOnChange}
                />
                {visibleRepass ? (
                  <span
                    className="material-symbols-outlined"
                    onClick={handleVisibleRepass}
                  >
                    visibility_off
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    onClick={handleVisibleRepass}
                  >
                    visibility
                  </span>
                )}
              </div>
            </div>
            <input type="submit" value="Reset password" />
          </form>
          {requiredField && <p className="error">{requiredField}</p>}
          {numberOfPass && <p className="error">{numberOfPass}</p>}
          {validPass && <p className="error">{validPass}</p>}
        </div>
        <div className="reset-right">
          <p>
            "Koi fish symbolize perseverance and strength in the face of
            adversity, reminding us that challenges can be overcome with
            patience and dedication." - Izumiya Koi
          </p>
        </div>
      </div>
    </div>
  );
};
