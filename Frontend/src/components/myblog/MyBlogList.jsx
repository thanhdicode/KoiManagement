import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/myblog/myblog.css";
// import service
import * as BlogService from "../../service/blog/blogService";
export const MyBlogList = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.userId;
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: blogs = [],
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["myBlogs", userId],
    queryFn: async () => BlogService.getUserBlogs(userId),
  });
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (blogs.length === 0) {
      setEmptyList("Your blog list is empty");
    } else {
      setEmptyList(null);
    }

    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isFetching, isLoading,isError]);
  return (
    <div className="my-blog-list">
    {serverError ? (
      <div className="error-page">
        <p>{serverError}</p>
      </div>
    ) : isLoadingPage ? (
      <div className="loading">
        <ClipLoader color="#000000" size={50} />
      </div>
    ) : emptyList ? (
      <div className="empty-list">
        <p>{emptyList}</p>
      </div>
    ) : (
      <>
        {blogs.map((blog) => (
          <Link
            key={blog.blogId}
            to={`/dashboard/myblog/review/${blog.blogId}`}
          >
            <strong>{blog.title}</strong>
            <p>Created at {blog.createDate}</p>
          </Link>
        ))}
      </>
    )}
  </div>
);
};