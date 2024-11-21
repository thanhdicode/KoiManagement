import React, { useEffect, useState } from "react";
// import styles
import "../../styles/blogdetail/blogdetail.css";
// import components
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
// import API
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as BlogService from "../../service/blog/blogService";

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
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { blogId } = useParams();
  const {
    data: blog,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => BlogService.detailBlogService(blogId),
    refetchOnWindowFocus: false,
  });
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
  }, [isFetching, isError]);

  return (
    <div className="blog-detail-container">
      <Navbar />
      <Settingnav />
      <div className="blog-detail">
        {serverError ? (
          <>
            <div className="error-page">
              <p>Server is closed now</p>
            </div>
          </>
        ) : (
          <>
            {isLoadingPage ? (
              <div className="loading">
                <ClipLoader color="#ffffff" size={50} />
              </div>
            ) : (
              <>
                <div className="blog-detail-header">
                  <strong>{blog && blog.title}</strong>
                  <p>
                    {new Date(blog && blog.createDate).toLocaleDateString() ||
                      "Date not available"}{" "}
                    - by {blog && blog.fullname}
                  </p>
                </div>
                <img src={blog && blog.image} alt="" />
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
                          stripHtmlTags(blog.content || "No content available"),
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
