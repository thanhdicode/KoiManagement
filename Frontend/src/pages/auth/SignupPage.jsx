import { useState, React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import SyncLoader from "react-spinners/SyncLoader";
// import styles
import "../../styles/auth/auth.css";
// import components
import { ModalSuccess } from "../../components/modal/ModalSuccess";
// import assets
import logo from "../../assets/logo.png";
import coverImg from "../../assets/logincover.jpg";
// import service
import * as AccountService from "../../service/account/AccountService";
// import redux
import { useDispatch, useSelector } from "react-redux";
// import slices
import { setEmail } from "../../redux/slices/account/account";
import { toggleSuccessModal } from "../../redux/slices/modal/modal";
export const SignupPage = () => {
  // selector
  const isToggleSignupSuccess = useSelector(
    (state) => state.modal.successModal.isToggleModal
  );
  // dispatch
  const dispatch = useDispatch();
  // navigation
  const navigate = useNavigate();
  // state
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRepass, setVisibleRepass] = useState(false);
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    repass: "",
  });
  const [existedEmail, setExistedEmail] = useState(null);
  const [validPass, setValidPass] = useState(null);
  const [validEmail, setValidEmail] = useState(null);
  const [requiredField, setRequiredField] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [numberOfPass, setNumberOfPass] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountService.signupService,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (responseData) => {
      setIsLoading(false);
      setResponseData(responseData);
      if (responseData && responseData.code === "EMAIL_EXISTED") {
        setExistedEmail("This email have existed, please try another one");
      } else {
        setExistedEmail(null);
        dispatch(setEmail(signupData.email));
        navigate("/verify-signup");
      }
      queryClient.invalidateQueries({
        queryKey: ["signup"],
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
  const handleOnChangeForm = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };
  // valiation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // handle submit form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // empty validation
    if (
      !signupData.fullname ||
      !signupData.email ||
      !signupData.password ||
      !signupData.repass
    ) {
      setRequiredField("All fields are required");
      return;
    } else {
      setRequiredField(null);
    }
    // email pattern validation
    if (!emailPattern.test(signupData.email)) {
      setValidEmail("Invalid, email should be: example@gmail.com");
      return;
    } else {
      setValidEmail(null);
    }
    // valid number of pass
    if (signupData.password.length < 9) {
      setNumberOfPass("Password must be at least 8 characters");
      return;
    } else {
      setNumberOfPass(null);
    }
    // password validation
    if (signupData.password !== signupData.repass) {
      setValidPass("Password and Confirm Password must be the same");
      return;
    } else {
      setValidPass(null);
    }
    try {
      await mutation.mutateAsync(signupData);
    } catch (error) {
      console.error(error);
    }
  };
  const oauthMutation = useMutation({
    mutationKey: ["oauth"],
    mutationFn: AccountService.oauthService,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (responseData) => {
      setIsLoading(false);
      if (responseData && responseData.code === "EMAIL_EXISTED") {
        setExistedEmail("This email have existed, please try another one");
      } else {
        setExistedEmail(null);
        dispatch(toggleSuccessModal());
        setTimeout(() => {
          dispatch(toggleSuccessModal());
          navigate("/");
        }, 1500);
      }
    },
  });
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const googleIdToken = credentialResponse.access_token;
      oauthMutation.mutateAsync(googleIdToken);
    },
  });
  return (
    <div className="signup-container">
      {isToggleSignupSuccess && (
        <ModalSuccess
          title="Signup Success"
          message="Welcome to Izumiya Koi, now system will redirect you to homepage"
        />
      )}
      {isLoading && (
        <div className="loading">
          <SyncLoader color="#ffffff" size={20} />
        </div>
      )}
      <div className="signup-main">
        <img src={logo} alt="" onClick={() => navigate("/")} />
        <div className="signup-main-header">
          <strong>Get Started Now</strong>
          <p>Let's create an account to access our features</p>
        </div>
        <div className="signup-oauth" onClick={handleGoogleLogin}>
          <i className="bx bxl-google"></i>
          <p>Signup with Google</p>
        </div>
        <div className="or">
          <p>or</p>
        </div>
        <form
          action=""
          onSubmit={handleSubmitForm}
          autoComplete="off"
          className="signup-form"
        >
          <div className="input-item">
            <label htmlFor="fullname">Fullname</label>
            <div>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Your full name"
                onChange={handleOnChangeForm}
              />
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleOnChangeForm}
              />
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="password">Password</label>
            <div>
              <input
                type={visiblePass ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleOnChangeForm}
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
                onChange={handleOnChangeForm}
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
          {existedEmail && <p className="fail">{existedEmail}</p>}
          {validPass && <p className="fail">{validPass}</p>}
          {requiredField && <p className="fail">{requiredField}</p>}
          {validEmail && <p className="fail">{validEmail}</p>}
          {numberOfPass && <p className="fail">{numberOfPass}</p>}
          <input
            type="submit"
            value="Create New Account"
            disabled={mutation.isPending}
          />
        </form>
        <div className="login-link">
          <p>Already have an account?</p>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
      <div className="signup-intro">
        <img src={coverImg} alt="" />
        <div className="intro">
          <strong>The simplest way to manage your Kois</strong>
          <p>
            Izumiya will bring for you all the best features to make Kois have
            the good life as possible
          </p>
        </div>
      </div>
    </div>
  );
};
