import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import service
import * as BlogService from "../../../service/blog/blogService";
// import styles
import "../../../styles/dashboard/adminblogdetail/adminblogdetail.css";
// import slices
import {
  toggleDeleteBlogModal,
  toggleUpdateBlogModal,
} from "../../../redux/slices/modal/modal";
const stripHtmlTags = (html) => {
  const allowedTags = ["strong", "em", "b", "i", "u", "br", "h2", "h3"];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const elements = doc.body.querySelectorAll("*");

  elements.forEach((el) => {
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      // Replace unwanted tags with their content
      el.replaceWith(...el.childNodes);
    }
  });
  return doc.body.innerHTML;
};
export const AdminBlogDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const ownUserId = user.userId;
  // dispatch
  const dispatch = useDispatch();
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isNotFoundBlog, setIsNotFoundBlog] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { blogId } = useParams();

  const {
    data: blog = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => BlogService.detailBlogService(blogId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  // handle func
  const handleToggleUpdateBlogModal = () => {
    dispatch(toggleUpdateBlogModal());
  };
  const handleToggleDelBlogModal = () => {
    dispatch(toggleDeleteBlogModal());
  };
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (blog && blog.code === "BLOG_NOT_FOUND") {
      setIsNotFoundBlog(true);
    } else {
      setIsNotFoundBlog(false);
    }

    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isFetching, isLoading, blog,isError]);

  return (
    <div className="admin-blog-detail-container">
        {serverError ? (
        <>
          <div className="error-page">
            <p>Server is closed now</p>
          </div>
        </>
      )  :(
        <>
         {isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={50} />
          </div>
        </>
      ) : (
        <>
          {isNotFoundBlog ? (
            <>
              <div className="not-found">
                <h2>Blog is not found</h2>
                <p>Please check ID of blog or it had been delete !</p>
              </div>
            </>
          ) : (
            <>
              <div className="admin-blog-detail-header">
                <strong>Blog #{blog.blogId || "N/A"} </strong>
                <div>
                  {blog.userId === ownUserId ? (
                    <>
                      <i
                        className="bx bx-edit-alt"
                        onClick={handleToggleUpdateBlogModal}
                      ></i>
                    </>
                  ) : (
                    ""
                  )}
                  <i
                    className="bx bx-trash-alt"
                    onClick={handleToggleDelBlogModal}
                  ></i>
                </div>
              </div>
              <div className="admin-blog-preview-main">
                <div className="header">
                  <strong>Preview</strong>
                  <p>What users see when they visit your blog</p>
                </div>
                <div className="main">
                  <div className="header">
                    <strong>{blog.title || "Untitled Blog"}</strong>
                    <p>
                      {new Date(blog.createDate).toLocaleDateString() ||
                        "Date not available"}
                    </p>
                  </div>
                  {blog.image ? (
                    <img src={blog.image} alt={blog.title || "Blog Image"} />
                  ) : (
                    <p>No image available</p>
                  )}
                  <div className="blog-detail-main">
                    <div className="share">
                      <strong>Share Article</strong>
                      <div>
                        <i className="bx bx-link-alt"></i>
                        <i className="bx bxl-facebook-circle"></i>
                        <i className="bx bxl-instagram-alt"></i>
                      </div>
                    </div>
                    <div className="blog-detail-content">
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            blog &&
                            stripHtmlTags(
                              blog.content || "No content available"
                            ),
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
        </>
      )}
     
    </div>
  );
};
