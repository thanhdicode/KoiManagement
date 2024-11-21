import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import styles
import "../../../styles/dashboard/myblog/myblog.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { MyBlogList } from "../../../components/myblog/MyBlogList";
import { AddBlog } from "../../../components/modal/AddBlog";
import { UpdateBlog } from "../../../components/modal/UpdateBlog";
import { DelBlog } from "../../../components/modal/DelBlog";
// import slices
import { toggleAddBlogModal } from "../../../redux/slices/modal/modal";
export const BlogManage = () => {
  // dispatch
  const dispatch = useDispatch();
  //   selector
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
  const handleToggleAddPondModal = () => {
    dispatch(toggleAddBlogModal());
  };

  return (
    <div className="blog-manage-container">
      <Dashnav />
      {isToggleUpdateBlogModal && <UpdateBlog />}
      {isToggleAddBlogModal && <AddBlog />}
      {isToggleDelBlogModal && <DelBlog />}
      <div className="blog-manage">
        <div className="blog-manage-header">
          <strong>My Blog</strong>
        </div>
        <div className="blog-manage-utils">
          {/* <div className="filter">
            <select name="" id="">
              <option value="">Filter</option>
              <option value="">By Date</option>
              <option value="">By Price</option>
              <option value="">By Number of Items</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div> */}
          <div className="add" onClick={handleToggleAddPondModal}>
            <i className="bx bx-plus"></i>
            <p>Create new blog</p>
          </div>
        </div>
        <MyBlogList />
      </div>
      {/* <div className="my-blog-empty">
        <strong>No order was selected</strong>
        <p>You can click to a order to see detail</p>
      </div> */}
      <Outlet />
    </div>
  );
};
