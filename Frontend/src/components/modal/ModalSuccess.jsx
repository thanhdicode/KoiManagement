import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/modal/modal.css";
export const ModalSuccess = ({ title, message }) => {
  return (
    <div className="login-success-modal-cover">
      <div className="modal">
        <i className="bx bx-badge-check"></i>
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
    </div>
  );
};
