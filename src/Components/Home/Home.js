import React from "react";
import "./Home.css";
import img from "../../Assets/shapes.png";
import Typical from "react-typical";
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
        <div id="para-sec" style={{ width: "30%" }}>
          <p>
            Laudantium proident saepe provident laborum, congue tempus facilisi.
            Vivamus ut leo dolorem, corrupti tempus tortor maiores ante,
            fermentum quibusdam cupiditate laoreet cubilia, harum class, massa
            ipsa. Quae velit, aliqua architecto auctor, laborum tellus, commodo.
            Feugiat atque? Tempora aliquip iure adipisci odio amet consequatur
            accumsan eget dolores, cubilia vero, consequuntur reprehenderit
            litora dui atque esse aliquam nec. Mollitia, euismod, fames eros.
            Pulvinar lorem ipsum, pulvinar dis aut. Mus deleniti duis reiciendis
            purus. Nihil! Faucibus alias nullam class
          </p>
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
            Our Solutions
          </h5>
        </div>

        <div class="ratio ratio-16x9 my-width">
          <iframe
            width="1280"
            height="720"
            src="https://www.youtube.com/embed/xNRJwmlRBNU"
            title="How To Embed YouTube Videos in React / Gatsby (and make them Responsive)"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </center>
    </>
  );
};
