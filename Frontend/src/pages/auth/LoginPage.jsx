import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import SyncLoader from "react-spinners/SyncLoader";

// import styles
import "../../styles/auth/auth.css";
// import components
import { ModalSuccess } from "../../components/modal/ModalSuccess";
// import assets
import coverImg from "../../assets/logincover2.jpg";
import logo from "../../assets/logo.png";
// import service
import * as AccountService from "../../service/account/AccountService";
// import slices
import { toggleSuccessModal } from "../../redux/slices/modal/modal";
export const LoginPage = () => {
  // selector
  const isToggleLoginSuccess = useSelector(
    (state) => state.modal.successModal.isToggleModal
  );
  // dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  // state
  const [visiblePass, setVisiblePass] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [validEmail, setValidEmail] = useState(null);
  const [wrongPassEmail, setWrongPassEmail] = useState(null);
  const [requiredField, setRequiredField] = useState(null);
  const [existedEmail, setExistedEmail] = useState(null);

  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountService.loginService,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (responseData) => {
      setIsLoading(false);
      setResponseData(responseData);
      if (responseData && responseData.code === "LOGIN_FAIL") {
        setWrongPassEmail("Wrong email or password");
      } else {
        setWrongPassEmail(null);
        dispatch(toggleSuccessModal());
        setTimeout(() => {
          dispatch(toggleSuccessModal());
          navigate("/");
        }, 1500);
      }
      queryCilent.invalidateQueries({
        queryKey: ["login"],
      });
    },
  });
  // handlefunc
  const handleOnChangeForm = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  // valiation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    // empty validation
    if (!loginData.email || !loginData.password) {
      setRequiredField("All fields are required");
      return;
    } else {
      setRequiredField(null);
    }
    // email pattern validation
    if (!emailPattern.test(loginData.email)) {
      setValidEmail("Invalid, email should be: example@gmail.com");
      return;
    } else {
      setValidEmail(null);
    }
    try {
      await mutation.mutateAsync(loginData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleVisiblePass = () => {
    setVisiblePass(!visiblePass);
  };
  // oauth mutation
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
    <div className="cover">
      {isLoading && (
        <div className="loading">
          <SyncLoader color="#ffffff" size={20} />
        </div>
      )}
      {isToggleLoginSuccess && (
        <ModalSuccess
          title="Login Success"
          message="Welcome back, now system will redirect you to homepage"
        />
      )}
      <img src={coverImg} alt="" />
      <div className="login-container">
        <div className="login-main">
          <div className="login-header">
            <img src={logo} alt="" onClick={() => navigate("/")} />
            <div>
              <strong>Welcome Back</strong>
              <p>Enter your credentials to access your account</p>
            </div>
          </div>
          <form
            action=""
            onSubmit={handleSubmitForm}
            className="login-form"
            autoComplete="off"
          >
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
            {requiredField && <p className="fail">{requiredField}</p>}
            {validEmail && <p className="fail">{validEmail}</p>}
            {wrongPassEmail && <p className="fail">{wrongPassEmail}</p>}
            {existedEmail && <p className="fail">{existedEmail}</p>}
            <Link to="/forget">Forget password?</Link>
            <input type="submit" value="Login To Izumiya" />
          </form>
          <div className="or">
            <p>or</p>
          </div>
          <div className="oauth" onClick={handleGoogleLogin}>
            <i className="bx bxl-google"></i>
            <p>Login with Google</p>
          </div>
          <div className="signup-link">
            <p>Don't have an account?</p>
            <Link to="/signup">Create A New</Link>
          </div>
        </div>
        <div className="login-right">
          <h2 className="type-writer line">Izumiya Koi</h2>
          <p>
            "The vibrant colors of koi fish represent beauty, harmony, and a
            peaceful coexistence with nature, inspiring us to seek balance in
            our own lives."
          </p>
        </div>
      </div>
    </div>
  );
};
