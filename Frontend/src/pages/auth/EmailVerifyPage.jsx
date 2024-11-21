import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
// import styles
import "../../styles/auth/auth.css";
// import component
import { ModalSuccess } from "../../components/modal/ModalSuccess";
// import redux
import { useSelector, useDispatch } from "react-redux";
// import service
import * as AccountService from "../../service/account/AccountService";
// import slices
import { toggleSuccessModal } from "../../redux/slices/modal/modal";
export const EmailVerifyPage = () => {
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // state
  const [submitOtp, setSubmitOtp] = useState(Array(6).fill(""));
  const [submitData, setSubmitData] = useState({
    email: "",
    otp: "",
  });
  const [invalidId, setInvalidId] = useState(null);
  //   selector
  const email = useSelector((state) => state.account.email.email);
  const isToggleSignupSuccess = useSelector(
    (state) => state.modal.successModal.isToggleModal
  );
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountService.verifyEmailSignup,
    onMutate: () => {
      setInvalidId(null);
    },
    onSuccess: (responseData) => {
      if (responseData && responseData.code === "EMAIL_OTP_INVALID") {
        setInvalidId("Invalid OTP, please try again");
      } else {
        setInvalidId(null);
        dispatch(toggleSuccessModal());
        setTimeout(() => {
          dispatch(toggleSuccessModal());
          navigate("/login");
        }, 2000);
      }
      queryClient.invalidateQueries({
        queryKey: ["verify-email"],
      });
    },
  });
  // handle func
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...submitOtp];
    newOtp[index] = element.value;
    setSubmitOtp(newOtp);
    setSubmitData({
      email: email,
      otp: newOtp.join(""),
    });
    // Automatically focus on the next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !submitOtp[index] &&
      e.target.previousSibling
    ) {
      e.target.previousSibling.focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="email-verify-container">
      {isToggleSignupSuccess && (
        <ModalSuccess
          title="Signup Successfully"
          message="Hello, you just become Izumiya's member, now system will redirect you to login page"
        />
      )}
      <div className="email-verify">
        <div className="email-verify-header">
          <h2>Email Verification</h2>
          <p>We have sent OTP code to your email {email}.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {submitOtp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={submitOtp[index]}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="otp-input"
              />
            ))}
          </div>
          {invalidId && <p className="error">{invalidId}</p>}
          <button type="submit" className="submit-btn">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};
