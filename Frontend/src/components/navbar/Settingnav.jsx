import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import styles
import "../../styles/components/navbar/navbar.css";
// import selector
import { useSelector } from "react-redux";
// import dispatch
import { useDispatch } from "react-redux";
// import slices
import { toggleSettingNav } from "../../redux/slices/navbar/navbar";
// import service
import * as AccountService from "../../service/account/AccountService";
export const Settingnav = () => {
  // state
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // selector
  const isToggleSettingnav = useSelector(
    (state) => state.navbar.settingNav.isToggleNav
  );
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountService.logoutService,
    onSuccess: () => {
      navigate("/login");
      queryCilent.invalidateQueries({
        queryKey: ["logout"],
      });
    },
  });
  // handle func
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const handleToggleSettingnav = () => {
    dispatch(toggleSettingNav());
  };
  const handleLogout = async () => {
    localStorage.removeItem("cartId");
    try {
      await mutation.mutateAsync(token);
      dispatch(toggleSettingNav());
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetIsUserRole = () => {
    if (token && user && role === "USER") {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  };
  const handleSetIsAdminRole = () => {
    if (token && user && role === "ADMIN") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };
  useEffect(() => {
    handleSetIsUserRole();
    handleSetIsAdminRole();
  }, []);
  return (
    <div
      className={
        isToggleSettingnav
          ? "setting-nav-container"
          : "setting-nav-container-close"
      }
    >
      <div className="setting-nav">
        <div className="setting-nav-header">
          <i className="bx bxs-user-circle"></i>
          <div>
            <strong>
              {user && user.fullname} ({user && user.role})
            </strong>
            <p>{user && user.email}</p>
          </div>
        </div>
        <div className="setting-nav-list">
          {isAdmin && (
            <>
              <Link to="/dashboard/admin/summary" className="setting-item">
                <i className="bx bxs-dashboard"></i>
                <p>Admin Dashboard</p>
              </Link>
              <Link to="/dashboard/admin/order" className="setting-item">
                <i className="bx bxs-package"></i>
                <p>Manage Orders</p>
              </Link>
              <Link to="/dashboard/setting" className="setting-item">
                <i className="bx bxs-cog"></i>
                <p>Your Profile</p>
              </Link>
              <Link to="" className="setting-item" onClick={handleLogout}>
                <i className="bx bxs-log-out"></i>
                <p>Logout</p>
              </Link>
            </>
          )}
          {isUser && (
            <>
              <Link to="/dashboard/home" className="setting-item">
                <i className="bx bxs-dashboard"></i>
                <p>Workspace</p>
              </Link>
              <Link to="/dashboard/setting" className="setting-item">
                <i className="bx bxs-cog"></i>
                <p>Your Profile</p>
              </Link>
              <Link to="/dashboard/myorder" className="setting-item">
                <i className="bx bxs-package"></i>
                <p>Your Orders</p>
              </Link>
              <Link to="" className="setting-item" onClick={handleLogout}>
                <i className="bx bxs-log-out"></i>
                <p>Logout</p>
              </Link>
            </>
          )}
          <div className="close" onClick={handleToggleSettingnav}>
            <i className="bx bx-x"></i>
            <p>Close Setting</p>
          </div>
        </div>
      </div>
    </div>
  );
};
