import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Home } from "../Home/Home";
import Footer from "../Footer/Footer";
import { Insurances } from "../InsurancesAvailable/Insurances";
import Content from "../Home/Content";
import FlipCards from "../Home/FlipCards";
import Reviews from "../Home/Reviews";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Login/Login.css";
const HomePage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const nav = useNavigate();
  const token = localStorage.getItem("Auth-Token");
  const navigate = useNavigate();
  console.log(token);
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);

      // Check if token has expired
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        // Show toast notification
        // Remove expired token
        localStorage.removeItem("Auth-Token");

        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);

        // Redirect user to login page
        setTimeout(() => {
          nav("/login");
        }, 5000);
        // Redirect user to login page
      } else {
        console.log("Token is still valid");
        const userId = decodedToken.nameid;
        console.log(userId);
      }
    } else {
      console.log("No token found");
    }
  }, []);

  return (
    <div>
      <center>
        {showAlert && <div className="custom-alert">Session Expired</div>}
      </center>
      <Navbar />
      <ToastContainer />
      <center>
        <div className="get-quota-design">
          <button onClick={scrollToSection}>Get a Quota Right now !!</button>
        </div>
      </center>
      <Home />
      
      <div ref={sectionRef}>
        <Insurances />
      </div>
      <Content />
      <FlipCards />
      
      <Reviews />
      <Footer />
    </div>
  );
};

export default HomePage;
