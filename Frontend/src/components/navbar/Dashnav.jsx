import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import styles
import "../../styles/components/navbar/navbar.css";
// import assets
import logo from "../../assets/logo.png";
export const Dashnav = () => {
  // state
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // handle func
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
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
    <div className="dashnav-container">
      <div className="dashnav">
        <div className="dashnav-header">
          <img src={logo} alt="" />
          <strong>Izumiya Koi</strong>
        </div>
        <div className="dashnav-list">
          {/* member */}
          {isUser && (
            <div className="dashnav-list-item">
              <div className="dashnav-list-item-header">
                <p>Menu</p>
              </div>
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="bx bx-home-alt"></i>
                <p>Home</p>
              </NavLink>
              <NavLink
                to="/dashboard/mypond"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="bx bx-cylinder"></i>
                <p>Pond Management</p>
              </NavLink>
              <NavLink
                to="/dashboard/myorder"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="bx bx-shopping-bag"></i>
                <p>Order</p>
              </NavLink>
              <NavLink
                to="/dashboard/myblog"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="bx bxl-blogger"></i>
                <p>Blog</p>
              </NavLink>
            </div>
          )}

          {/* section admin */}
          {isAdmin && (
            <>
              <div className="dashnav-list-item">
                <div className="dashnav-list-item-header">
                  <p>Admin</p>
                </div>
                <NavLink
                  to="/dashboard/admin/summary"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <i className="bx bx-home-alt"></i>
                  <p>Summary</p>
                </NavLink>
                <NavLink
                  to="/dashboard/admin/account"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <i className="bx bx-cylinder"></i>
                  <p>Account Management</p>
                </NavLink>
                <NavLink
                  to="/dashboard/admin/product"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <i className="bx bx-package"></i>
                  <p>Product Management</p>
                </NavLink>

                <NavLink
                  to="/dashboard/admin/blog"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <i className="bx bxl-blogger"></i>
                  <p>Blog Management</p>
                </NavLink>
              </div>
              <div className="dashnav-list-item">
                <div className="dashnav-list-item-header">
                  <p>Customers</p>
                </div>
                <NavLink
                  to="/dashboard/admin/order"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <i className="bx bx-shopping-bag"></i>
                  <p>Order Management</p>
                </NavLink>
              </div>
            </>
          )}

          {/* section tool */}
          <div className="dashnav-list-item">
            <div className="dashnav-list-item-header">
              <p>Utilities</p>
            </div>
            <NavLink
              to="/dashboard/setting"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-cog"></i>
              <p>Setting</p>
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-log-out-circle"></i>
              <p>Return to homepage</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
