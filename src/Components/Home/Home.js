import React from "react";
import "./Home.css";
import img from "../../Assets/shapes.png";
import Typical from "react-typical";
import img1 from "../../Assets/undraw_website_5bo8.png"
export const Home = () => {
  return (
    <>
      <div id="div-my">
        <div>
          <div id="pri">
            <h2 id="heading-1">Drive Secure</h2>{" "}
            <h2 id="heading-typical" style={{ color: "#479ed8" }}>
              {" "}
              <Typical
                loop={Infinity}
                steps={["Technologies", 1000, "Insurance Providers", 1000]}
              />
            </h2>
          </div>
        </div>
        <div id="image" >
          <img src={img1} className="imageee"/>
        </div>
      </div>
      <center>
        <button
          className="btn1"
          style={{ color: "black", fontFamily: "'Cinzel', serif" }}
        >
          Click to explore
        </button>
      </center>
      <img src={img} />
      <center>
        <div>
          <h5
            style={{ marginTop: "50px", fontSize: "30px", paddingTop: "50px" }}
          >
            Why Insurance ?? Watch the video to know more !
          </h5>
        </div>

        <div class="ratio ratio-16x9 my-width" style={{width:"500px"}}>
          <iframe
            width="1280"
            height="720"
            src="https://www.youtube.com/embed/yh7QbUxOApY"
            title="Importance of Automobile Insurance"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </center>
    </>
  );
};
