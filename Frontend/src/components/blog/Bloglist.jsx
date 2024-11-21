import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/blog/blog.css";

// import API
import { useQuery } from "@tanstack/react-query";
import * as BlogService from "../../service/blog/blogService";
// convert to plain text
const stripHtmlTags = (html) => {
  const allowedTags = ["strong", "em", "b", "i", "u", "br", "h2"];
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
export const Bloglist = ({ infinityScroll, isLoadingList }) => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const {
    data: blogs = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAllBlog,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
  }, [isLoading, isFetching]);

  return (
    <div className="bloglist-container">
      {isLoadingPage || isLoadingList ? (
        <>
          <div className="loading">
            <ClipLoader color="#ffffff" size={50} />
          </div>
        </>
      ) : (
        <>
          {blogs.slice(0, infinityScroll).map((blog) => (
            <Link
              to={`/blogdetail/${blog.blogId}`}
              className="blog-item"
              key={blog.blogId}
            >
              <img src={blog.image} alt="" />
              <small>Created at {blog.createDate}</small>
              <strong>{blog.title}</strong>

              <span>By {blog.fullname}</span>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
