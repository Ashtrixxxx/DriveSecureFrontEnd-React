import React from "react";
import "./Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CListGroup,
  CListGroupItem,
  CCardLink,
} from "@coreui/react";
import img from "../../Assets/shapes-removebg-preview.png";
import pro1 from "../../Assets/bike2.png";
import pro2 from "../../Assets/car2.jpg";
import pro3 from "../../Assets/truck.png";
import { Link, useNavigate } from "react-router-dom";
export const Insurances = () => {
  const nav = useNavigate();

  return (
    <div className="my-insurance-div">
      <div className="header">
        <h1>Available Insurances</h1>
        <i class="fa-brands fa-instagram"></i>{" "}
      </div>
      <div className="container1">
        <img src={img} className="shape" />
      </div>
      <div className="mycards">
        <div className="card-containers">
          <CCard
            style={{ width: "25rem" }}
            onClick={() => {
              nav("/insurance/Bike");
            }}
          >
            <CCardImage
              orientation="top"
              src={pro1}
              style={{ width: "398px", height: "250px" }}
            />
            <CCardBody style={{ backgroundColor:"white"}}>
              <CCardTitle>Bike Insurance</CCardTitle>
              <CCardText>
                Get comprehensive coverage for your bike against accidents,
                theft, and natural calamities. Protect yourself from financial
                burdens with the best bike insurance plans.
              </CCardText>
            </CCardBody>
            <CListGroup flush>
              <CListGroupItem>Coverage for Accidental Damage</CListGroupItem>
              <CListGroupItem>Third-Party Liability Coverage</CListGroupItem>
              <CListGroupItem>Theft Protection</CListGroupItem>
            </CListGroup>
           
          </CCard>

          <div className="card-containers">
            <CCard
              style={{ width: "25rem" }}
              onClick={() => {
                nav("/insurance/Car");
              }}
            >
              <CCardImage orientation="top" src={pro2}  style={{height:"250px"}}/>
              <CCardBody style={{ backgroundColor:"white"}}>
                <CCardTitle>Car Insurance</CCardTitle>
                <CCardText>
                  Safeguard your car with all-round protection. Our car
                  insurance covers accidents, third-party liabilities, and more
                  to keep you stress-free on the road.
                </CCardText>
              </CCardBody>
              <CListGroup flush>
                <CListGroupItem>Comprehensive Accident Coverage</CListGroupItem>
                <CListGroupItem>
                  Third-Party Liability & Property Damage
                </CListGroupItem>
                <CListGroupItem>
                  Natural Disaster and Theft Protection
                </CListGroupItem>
              </CListGroup>
              
            </CCard>
          </div>

          <div className="card-containers">
            <CCard
              style={{ width: "25rem" }}
              onClick={() => {
                nav("/insurance/Truck");
              }}
            >
              <CCardImage orientation="top" src={pro3} style={{height:"250px",}}/>
              <CCardBody style={{ backgroundColor:"white"}}>
                <CCardTitle>Truck Insurance</CCardTitle>
                <CCardText>
                  Ensure your truck is fully insured against accidents, damage,
                  and third-party liabilities. Protect your livelihood with our
                  specialized truck insurance policies.
                </CCardText>
              </CCardBody>
              <CListGroup flush style={{ backgroundColor:"white"}}>
                <CListGroupItem >
                  Comprehensive Accident Protection
                </CListGroupItem>
                <CListGroupItem>Cargo and Load Insurance</CListGroupItem>
                <CListGroupItem>Third-Party Property Damage</CListGroupItem>
              </CListGroup>
              
            </CCard>
          </div>
        </div>
      </div>
    </div>
  );
};
