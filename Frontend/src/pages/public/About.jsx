import React, { useEffect, useState } from "react";
// import styles
import "../../styles/about/about.css";
// import components
import blogheader from "../../assets/blogheader.jpg";
import AboutOurTeam from "../../components/About/Aboutourteam";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import service

export const About = () => {
  // state
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    handleSetIsAuth();
  }, [handleSetIsAuth]);
  return (
    <div className="about-container">
      <Navbar />
      {isAuth && <Settingnav />}
      <div className="about">
        <div className="about-title">
          <strong>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit in,
            mollitia ex quam deserunt tempore porro quaerat eum ut perspiciatis
            repellendus, ad, eligendi nihil quibusdam corrupti excepturi
            cupiditate voluptatum? Quis?
          </strong>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sunt
            reiciendis cumque aut maiores suscipit eos temporibus voluptatibus.
            At accusantium debitis quia ipsam aut sequi corporis voluptatem
            similique ratione sed.
          </p>
        </div>
        <div className="banner">
          <img src={blogheader} alt="" />
        </div>
        <div className="about-header">
          <strong>Our Team</strong>
          <p>Our team member</p>
        </div>
        <AboutOurTeam />
      </div>
      <Footer />
    </div>
  );
};
