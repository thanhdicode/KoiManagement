import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
// import styles
import "./styles/homepage/homepage.css";
// import components
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Settingnav } from "./components/navbar/Settingnav";
// import assets
import introVideo from "./assets/koivideo.mp4";
import feature1 from "./assets/feature1.png";
import feature2 from "./assets/feature2.png";
import feature3 from "./assets/feature3.png";
import shopheader1 from "./assets/shopheader1.jpg";
import shopheader2 from "./assets/shopheader2.jpg";
import group from "./assets/group.png";
// import service
import * as AccountService from "./service/account/AccountService";
import * as BlogService from "./service/blog/blogService";
import * as ProductService from "./service/product/productService";
import * as CartService from "./service/cart/cartService";
import * as CategoryService from "./service/category/categoryService";
import { scroller } from "react-scroll";
const stripHtmlTags = (html) => {
  const allowedTags = ["strong", "em", "b", "i", "u", "br", "h2"];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const elements = doc.body.querySelectorAll("*");

  elements.forEach((el) => {
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      el.replaceWith(...el.childNodes);
    }
  });
  return doc.body.innerHTML;
};
export const Homepage = () => {
  // location
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  // state
  const [isAuth, setIsAuth] = useState(false);

  // query
  const { data: blogs = [] } = useQuery({
    queryKey: ["last-blogs"],
    queryFn: BlogService.getAllBlog,
  });
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: ProductService.getAllProductShop,
    refetchOnWindowFocus: false,
  });

  const { data: cartInfo = {} } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
  });
  // handle func
  const handleSetIsAuth = async () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
      await mutation.mutateAsync(token);
      await cartMutation.mutateAsync(userId);
      localStorage.removeItem("cart");
    }
  };

  useEffect(() => {
    try {
      handleSetIsAuth();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // mutation
  const queryClient = useQueryClient();
  const cartMutation = useMutation({
    mutationFn: CartService.createCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
  const mutation = useMutation({
    mutationFn: AccountService.verifyToken,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["verify"],
      });
    },
  });
  // scroll
  const handleScrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -85,
    });
  };
  return (
    <div className="homepage-container" id="homepage">
      <Navbar />
      {isAuth && <Settingnav />}
      <div className="homepage-intro">
        <video src={introVideo} autoPlay loop muted>
          <source type="video/mp4" />
        </video>
        <div className="homepage-intro-header">
          <span>WHAT IS IZUMIYA?</span>
          <h2>The Simplest Manage System of Koi Is Here</h2>
          <div>
            <p>
              Izumiya is a comprehensive koi pond management system designed to
              simplify the care and maintenance of koi ponds. With a range of
              features that cater to both hobbyists and professionals, Izumiya
              offers tools to monitor water quality, schedule feedings, track
              the health of koi, and manage pond equipment. Whether you're
              managing a small home pond or a larger, more complex setup,
              Izumiya ensures that your koi thrive in a balanced and
              well-maintained environment.
            </p>
            <div className="other-link">
              <a onClick={() => handleScrollTo("solutions")}>See Solutions</a>
              <Link to="/dashboard/mypond">Start Using Izumiya</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-intro" id="solutions">
        <div className="feature-intro-header">
          <h2>Izumiya Solutions</h2>
        </div>
        <div className="features">
          <div className="feature-item">
            <h2>Manage Koi Ponds and Fish</h2>
            <p>
              Izumiya provides a streamlined platform for managing your koi pond
              and the koi themselves. This feature allows users to monitor water
              conditions such as pH levels, temperature, and filtration systems
              to maintain a healthy environment. It also helps track individual
              koi fish, including their health status, growth progress, and any
              specific care needs, ensuring that every aspect of the pond
              ecosystem is in balance.
            </p>
            <img src={feature2} alt="" />
          </div>
          <div className="feature-item">
            <h2>Calculate Food and Salt Requirements</h2>
            <p>
              To support the healthy growth of koi fish, Izumiya includes a
              calculation tool that determines the optimal amount of food, salt,
              and other supplements based on the size, age, and number of koi.
              This feature ensures that your fish receive the right nutrients in
              the correct proportions, promoting their growth while maintaining
              the overall health of the pond.
            </p>
            <img src={feature3} alt="" />
          </div>
          <div className="feature-item">
            <h2>Others Features for Pond Management</h2>
            <p>
              Beyond basic pond and fish management, Izumiya offers various
              additional features to simplify maintenance tasks. These include
              tools for scheduling water changes, managing equipment like pumps
              and filters, and setting up automated reminders for regular care
              activities. Whether you are a novice or an experienced koi
              enthusiast, Izumiya's flexible tools can adapt to your needs.
            </p>
            <img src={feature1} alt="" />
          </div>
        </div>
      </div>
      <div className="shop-intro">
        <div className="shop-intro-header">
          <h2>Izumiya Also Give You Best Products</h2>
        </div>
        <div className="shop-intro-item">
          <img src={shopheader1} alt="" />
          <div className="shop-intro-item-header">
            <div>
              <strong>Koi Health Production</strong>
              <p>
                Ensuring the health of your koi is a top priority, and Izumiya
                offers a curated selection of fish health products to keep your
                koi vibrant and strong. From specialized koi food that promotes
                growth and color vibrancy to medications that treat common
                ailments, our fish health category covers everything you need to
                support the overall well-being of your fish. Whether you're
                looking to prevent disease or boost immunity, our products are
                tailored to meet the specific needs of koi.
              </p>
              <Link to="/shop/category/1">Explore Now</Link>
            </div>
            <div className="shop-intro-item-list">
              <strong>Best Health Products</strong>
              <div>
                {products.slice(0, 2).map((product) => (
                  <div key={product.productId} className="product-item">
                    <img src={product.image} alt="" />
                    <strong>{product.productName}</strong>
                    <p>${product.unitPrice}</p>
                    <Link to={`/buynow/${product.productId}`}>Buy now</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="shop-intro-item">
          <div className="shop-intro-item-header">
            <div>
              <strong>Water Quality Supplies</strong>
              <p>
                At Izumiya, we understand that maintaining pristine water
                quality is essential for the health and well-being of your koi
                fish. Our water quality supplies are designed to help you
                monitor and balance critical water parameters such as pH,
                ammonia, nitrite, and nitrate levels. From water conditioners
                and dechlorinators to test kits and filtration media, our range
                of products ensures that your pond remains a clean, safe, and
                thriving environment for your koi.
              </p>
              <Link to="/shop/category/2">Explore Now</Link>
            </div>
            <div className="shop-intro-item-list">
              <strong>Best Water Products</strong>
              <div>
                {products.slice(2, 4).map((product) => (
                  <div key={product.productId} className="product-item">
                    <img src={product.image} alt="" />
                    <strong>{product.productName}</strong>
                    <p>${product.unitPrice}</p>
                    <Link to={`/buynow/${product.productId}`}>Buy now</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img src={shopheader2} alt="" />
        </div>
      </div>
      <div className="blog-intro">
        <div className="blog-intro-header">
          <h2>Izumiya's Lastest Blogs</h2>
          <Link to="/blog">Explore Blogs</Link>
        </div>
        <div className="blog-list">
          {blogs.slice(0, 4).map((blog) => (
            <Link
              key={blog.blogId}
              to={`blogdetail/${blog.blogId}`}
              className="blog-item"
            >
              <i className="bx bx-spreadsheet"></i>
              <div>
                <strong>{blog && blog.title}</strong>
                <p
                  dangerouslySetInnerHTML={{
                    __html: blog && stripHtmlTags(blog.content),
                  }}
                ></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="about-intro" id="contact">
        <div>
          <img src={group} alt="" />
          <p>
            "Our team would like to thank the students who supported us in this
            project, and thank the jury for listening and providing insightful
            comments during the defense of this project. Special thanks to Ms.
            Huong for accompanying us."
          </p>
          <strong>Truong Hoang Tri - Leader</strong>
          <span>Group 8</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};
