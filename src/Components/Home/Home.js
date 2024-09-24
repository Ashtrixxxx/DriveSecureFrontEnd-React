import React from "react";
import "./Home.css";
import img from "../../Assets/shapes-removebg-preview.png";
import Typical from "react-typical";
import img1 from "../../Assets/undraw_work_from_anywhere_re_s2i6.svg";

export const Home = () => {
  return (
    <div className="overall-home-div">
      <div id="div-my">
        <div id="pri">
          <h2 id="heading-1">Drive Secure</h2>
          <h2 id="heading-typical" style={{ color: "#9A1750" }}>
            <Typical
              loop={Infinity}
              steps={["Technologies", 1000, "Insurance Providers", 1000]}
            />
          </h2>
          <center>
            <h4 id="subheading">
              Create your own custom insurance plans today and manage your
              policies effortlessly from anywhere, anytime. Secure your vehicle
              and your future with just a few clicks!
            </h4>{" "}
          </center>{" "}
        </div>
        <div id="image">
          <img src={img1} className="imageee" alt="Responsive" />
        </div>
      </div>

      <center>
        <button
          className="btn1"
          style={{
            color: "black",
            fontFamily: "'Cinzel', serif",
            backgroundColor: "#9A1750",
          }}
        >
          Click to explore
        </button>
      </center>

      <img src={img} className="bgimage" alt="Background" />

      <center>
        <div>
          <h5
            style={{
              marginTop: "50px",
              fontSize: "30px",
              paddingTop: "50px",
            }}
          >
            Why Insurance ?? Watch the video to know more!
          </h5>
        </div>

        <div className="ratio ratio-16x9 my-width" style={{ width: "500px" }}>
          <iframe
            width="1280"
            height="720"
            src="https://www.youtube.com/embed/yh7QbUxOApY"
            title="Importance of Automobile Insurance"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </center>
    </div>
  );
};
