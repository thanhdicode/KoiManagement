import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/notfound/notfound.css";
export const NotFound = () => {
  useEffect(() => {
    document.title = "404 Page";
  }, []);
  return (
    <div className="not-found-container">
      <div className="not-found">
        <i className="bx bx-dizzy"></i>
        <strong>Page not found</strong>
        <p>
          Sorry, page you looking for is not existed please check URL and try
          again.
        </p>
        <Link to="/">Return to Homepage</Link>
      </div>
    </div>
  );
};
