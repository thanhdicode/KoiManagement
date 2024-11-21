import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../../styles/dashboard/myblogdetail/myblogdetail.css";
// import assets
// import slices
import {
  toggleDeleteBlogModal,
  toggleUpdateBlogModal,
} from "../../../redux/slices/modal/modal";
// import service
import * as BlogService from "../../../service/blog/blogService";
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
export const BlogDetail = () => {
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isNotFoundBlog, setIsNotFoundBlog] = useState(false);
  const [serverError, setServerError] = useState(null);
  // param
  const { blogId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  const handleToggleUpdateBlogModal = () => {
    dispatch(toggleUpdateBlogModal());
  };
  const handleToggleDelBlogModal = () => {
    dispatch(toggleDeleteBlogModal());
  };
  // query
  const {
    data: blog = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => BlogService.detailBlogService(blogId),
    refetchOnWindowFocus: true,
  });
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
    <div className="my-blog-detail-container">
     {serverError ? (
            <div className="error-page">
              <p>{serverError}</p>
            </div>
          ) : isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
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
              <div className="my-blog-detail-header">
                <strong>My Blog #{blog.blogId || "N/A"}</strong>
                <div>
                  <i
                    className="bx bx-edit-alt"
                    onClick={handleToggleUpdateBlogModal}
                  ></i>
                  <i
                    className="bx bx-trash-alt"
                    onClick={handleToggleDelBlogModal}
                  ></i>
                </div>
              </div>
              <div className="my-blog-preview-main">
                <div className="header">
                  <strong>Preview</strong>
                  <p>What user see when they visit your blog</p>
                </div>
                <div className="main">
                  <div className="header">
                    <strong>{blog.title || "Untitled Blog"}</strong>
                    <p>
                      {new Date(blog.createDate).toLocaleDateString() ||
                        "Date not available"}
                    </p>
                  </div>
                  <img src={blog.image || ""} alt="" />
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
    </div>
  );
};
