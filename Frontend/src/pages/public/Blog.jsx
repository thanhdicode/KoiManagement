import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
// import styles
import "../../styles/blog/blog.css";
// import components
import { Bloglist } from "../../components/blog/Bloglist";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import service
import * as BlogService from "../../service/blog/blogService";

export const Blog = () => {
  // state
  const [isAuth, setIsAuth] = useState(false);
  const [infinityScroll, setInfinityScroll] = useState(6);
  const [endBlog, setEndBlog] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { data: blogs = [], isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAllBlog,
    refetchOnWindowFocus: false,
  });
  // handle func
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };
  // handle func
  const handlePagination = () => {
    if (infinityScroll < blogs.length) {
      setIsLoadingList(true); // Start loading
      setTimeout(() => {
        setInfinityScroll(infinityScroll + 6);
        setIsLoadingList(false);
      }, 1000);
    }
  };
  useEffect(() => {
    handleSetIsAuth();
    // Check if we've loaded all blogs
    if (blogs.length > 0 && infinityScroll >= blogs.length) {
      setEndBlog("You have reached the last blog");
    } else {
      setEndBlog(null);
    }

    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [blogs, infinityScroll, isError]);
  return (
    <div className="blog-container">
      <Navbar />
      {isAuth && <Settingnav />}
      <div className="blog">
        {blogs.length === 0 ? (
          <>
            <div className="empty-blog">
              <p>Our community has not posted any blogs yet.</p>
            </div>
          </>
        ) : (
          <>
            <div className="blog-header">
              <strong>BLOGS</strong>
              <p>Find out outstanding topics of Izumiya's community.</p>
            </div>
            {serverError ? (
              <>
                <div className="error-page">
                  <p>Server is closed now</p>
                </div>
              </>
            ) : (
              <>
                <Bloglist
                  infinityScroll={infinityScroll}
                  isLoadingList={isLoadingList}
                />
                {endBlog ? (
                  ""
                ) : (
                  <>
                    {blogs.length === 0 ? (
                      ""
                    ) : (
                      <>
                        <div className="infinity-scroll">
                          <strong onClick={handlePagination}>
                            Load more blogs
                          </strong>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
