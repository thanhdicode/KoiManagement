import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import styles
import "../../../styles/dashboard/adminaccount/adminaccount.css";
// import components
import { AccountList } from "../../../components/account/AccountList";
import { DelAccount } from "../../../components/modal/DelAccount";
import { Dashnav } from "../../../components/navbar/Dashnav";
import { AddAccountAdmin } from "../../../components/modal/AddAccountAdmin";
import { toggleAccountModal } from "../../../redux/slices/modal/modal";
export const AdminAccountManage = () => {
  // dispatch
  const dispatch = useDispatch();
  const isToggleDelAccountModal = useSelector(
    (state) => state.modal.deleteAccountModal.isToggleModal
  );
  const isToggleAddAccountModal = useSelector(
    (state) => state.modal.addAccountModal.isToggleModal
  );
  // handle func
  const handleToggleAddAccountModal = () => {
    dispatch(toggleAccountModal());
  };
  return (
    <div className="admin-account-container">
      {isToggleAddAccountModal && <AddAccountAdmin />}
      {isToggleDelAccountModal && <DelAccount />}
      <Dashnav />
      <div className="admin-account">
        <div className="admin-account-header">
          <strong>Account Manager</strong>
        </div>
        <div className="admin-account-utils">
          <div className="search-account">
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search account..." />
          </div>
          <div className="filter">
            <select name="" id="">
              <option value="">Filter</option>
              <option value="">By Status</option>
              <option value="">By size</option>
              <option value="">By Number of Koi</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div>
          <div className="add" onClick={handleToggleAddAccountModal}>
            <i className="bx bx-plus"></i>
            <p>Create new account</p>
          </div>
        </div>
        <AccountList />
      </div>
    </div>
  );
};
