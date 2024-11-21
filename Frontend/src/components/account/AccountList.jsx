import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/account/account.css";
// import service
import * as AccountService from "../../service/account/AccountService";
// import slices
import { setUserId } from "../../redux/slices/account/account";
import { toggleDeleteAccountModal } from "../../redux/slices/modal/modal";
export const AccountList = () => {
  // dispatch
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const ownUserId = user.userId;
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: users = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: AccountService.getUserListAdmin,
    refetchOnWindowFocus: false,
  });
  // handle func
  const handleToggleDelAccountModal = (userId) => {
    dispatch(setUserId(userId));
    dispatch(toggleDeleteAccountModal());
  };
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isLoading, isFetching, isError]);
  return (
    <table className="account-list-table">
      <thead>
        <tr>
          <th>No</th>
          <th>User</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {serverError ? (
          <>
            <div className="error-page">
              <p>Server is closed now</p>
            </div>
          </>
        ) : (
          <>
            {isLoadingPage ? (
              <>
                <div className="loading">
                  <ClipLoader color="#000000" size={40} />
                </div>
              </>
            ) : (
              <>
                {users.map((user, index) => (
                  <tr key={user.userId}>
                    <td>{index + 1}</td>
                    <td>
                      <i className="bx bx-user"></i>
                      <div>
                        <strong>{user.fullname}</strong>
                        <p>{user.email}</p>
                      </div>
                    </td>
                    <td>{user.phone || "NULL"}</td>
                    <td>{user.address || "NULL"}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.userId === ownUserId ? (
                        ""
                      ) : (
                        <>
                          <i
                            className="bx bxs-trash"
                            onClick={() =>
                              handleToggleDelAccountModal(user.userId)
                            }
                          ></i>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </>
        )}
      </tbody>
    </table>
  );
};
