import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
// import styles
import "../../styles/auth/auth.css";
// import assets
import coverImg from "../../assets/logincover3.jpg";
// import logo from "../../assets/logo.png";
// import service
import * as AccountService from "../../service/account/AccountService";
// import slices
import { setEmail } from "../../redux/slices/account/account";
export const ForgetPage = () => {
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // state
  const [submitData, setSubmitData] = useState({
    email: "",
  });
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [requiredField, setRequiredField] = useState(null);
  const [existedEmail, setExistedEmail] = useState(null);
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountService.forgetPassService,
    onMutate: () => {
      setIsLoadingPage(true);
    },
    onSuccess: (responseData) => {
      setIsLoadingPage(false);
      if (responseData && responseData.code === "EMAIL_NOT_EXISTED") {
        setExistedEmail("Email not existed in our database, try again!");
      } else {
        dispatch(setEmail(submitData.email));
        navigate("/verify-forget-pass");
      }
      queryClient.invalidateQueries({
        queryKey: ["forget"],
      });
    },
  });
  // handle func
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submitData.email) {
      setRequiredField("All fields are required");
      return;
    } else {
      setRequiredField(null);
    }
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {}
  };
  useEffect(() => {
    console.log(submitData);
  }, [submitData]);
  return (
    <div className="cover">
      {isLoadingPage && (
        <div className="loading">
          <SyncLoader color="#ffffff" size={20} />
        </div>
      )}
      <>
        <img src={coverImg} alt="" />
        <div className="forget-container">
          <div className="forget-main">
            <div className="forget-header">
              <div>
                <strong>Forget password?</strong>
                <p>Oops, don't worry we will help you take back your account</p>
              </div>
            </div>
            <form
              action=""
              onSubmit={handleSubmit}
              autoComplete="off"
              className="forget-form"
            >
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                onChange={handleOnChange}
              />
              {requiredField && <p className="error">{requiredField}</p>}
              {existedEmail && <p className="error">{existedEmail}</p>}
              <input type="submit" value="Send to my email" />
            </form>
            <Link to="/login">Just remember password?</Link>
          </div>
          <div className="forget-right">
            <p>
              "Koi wa gyakkyo ni chokumen shitemo nintai to tsuyosa o shōchō
              shi, chōsen wa nintai to kenshin de norikoeru koto ga dekiru koto
              o watashitachi ni omoidasa semasu." - Izumiya Koi
            </p>
          </div>
        </div>
      </>
    </div>
  );
};
