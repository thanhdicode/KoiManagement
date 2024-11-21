import React from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import styles
import "../../../styles/dashboard/adminblog/adminblog.css";
// import component
import { Dashnav } from "../../../components/navbar/Dashnav";
import { AdminBlogList } from "../../../components/adminblog/AdminBlogList";
import { AddBlog } from "../../../components/modal/AddBlog";
import { UpdateBlog } from "../../../components/modal/UpdateBlog";
import { DelBlog } from "../../../components/modal/DelBlog";
// import slices
import { toggleAddBlogModal } from "../../../redux/slices/modal/modal";
export const AdminBlogManage = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const isToggleAddBlogModal = useSelector(
    (state) => state.modal.addBlogModal.isToggleModal
  );
  const isToggleUpdateBlogModal = useSelector(
    (state) => state.modal.updateBlogModal.isToggleModal
  );
  const isToggleDelBlogModal = useSelector(
    (state) => state.modal.deleteBlogModal.isToggleModal
  );
  // handle func
  const handleToggleAddBlogModal = () => {
    dispatch(toggleAddBlogModal());
  };

  return (
    <div className="admin-blog-container">
      <Dashnav />
      {isToggleAddBlogModal && <AddBlog />}
      {isToggleUpdateBlogModal && <UpdateBlog />}
      {isToggleDelBlogModal && <DelBlog />}
      <div className="admin-blog">
        <div className="admin-blog-header">
          <strong>My Blog</strong>
        </div>
        <div className="admin-blog-utils">
          <div className="filter">
            <select name="" id="">
              <option value="">Filter</option>
              <option value="">By Date</option>
              <option value="">By Price</option>
              <option value="">By Number of Items</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div>
          <div className="add" onClick={handleToggleAddBlogModal}>
            <i className="bx bx-plus"></i>
            <p>Create new blog</p>
          </div>
        </div>
        <AdminBlogList />
      </div>
      {/* <div className="admin-blog-empty">
        <strong>No order was selected</strong>
        <p>You can click to a order to see detail</p>
      </div> */}
      <Outlet />
    </div>
  );
};
