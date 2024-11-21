import React from "react";
import { Link } from "react-router-dom";
import member1 from "../../assets/member1.jpg";
import member2 from "../../assets/member2.jpg";
import member3 from "../../assets/member3.jpg";
import member4 from "../../assets/member4.jpg";
import "../../styles/components/about/about.css";

const teamMembers = [
  { img: member1, name: "Tri", role: "CEO" },
  { img: member2, name: "Thanh Huynh", role: "CTO" },
  { img: member3, name: "Cat", role: "Developer" },
  { img: member4, name: "Thong", role: "Developer" },
];

export const AboutOurTeam = () => {
  return (
    <div className="memberlist-container">
      {teamMembers.map((member, index) => (
        <Link
          key={index}
          to="https://www.youtube.com/youtube"
          className="blog-item"
        >
          <img src={member.img} alt={member.name} />
          <small>Joined At</small>
          <strong>{member.name}</strong>
          <span>{member.role}</span>
        </Link>
      ))}
    </div>
  );
};

export default AboutOurTeam;
