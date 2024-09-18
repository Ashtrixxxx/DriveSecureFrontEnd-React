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
import img from "../../Assets/shapes.png";
import pro1 from "../../Assets/Bike.jpg";
import pro2 from "../../Assets/CarImage.jpeg";
import pro3 from "../../Assets/Truck.jpg";
import { Link, useNavigate } from "react-router-dom";
export const Products = () => {
const nav = useNavigate();

  return (
    <>
      <div className="header">
        <h1>Available Insurances</h1>
        <i class="fa-brands fa-instagram"></i>{" "}
      </div>
      <div className="container1">
        <img src={img} className="shape" />
      </div>
      <div className="mycards">
        <div className="card-containers">
          <CCard style={{ width: "25rem" }} onClick={()=>{nav('/insurance/Bike')}} >
            <CCardImage orientation="top" src={pro1} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
            <CListGroup flush>
              <CListGroupItem>Cras justo odio</CListGroupItem>
              <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
              <CListGroupItem>Vestibulum at eros</CListGroupItem>
            </CListGroup>
            <CCardBody>
              <CCardLink href="#">Project link</CCardLink>
            </CCardBody>
          </CCard>
        </div>
        <div className="card-containers">
          <CCard style={{ width: "25rem" }} onClick={()=>{nav('/insurance/Car')}}>
            <CCardImage orientation="top" src={pro2} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
            <CListGroup flush>
              <CListGroupItem>Cras justo odio</CListGroupItem>
              <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
              <CListGroupItem>Vestibulum at eros</CListGroupItem>
            </CListGroup>
            <CCardBody>
              <CCardLink href="#">Project link</CCardLink>
            </CCardBody>
          </CCard>
        </div>
        <div className="card-containers">
          <CCard style={{ width: "25rem" }} onClick={()=>{nav('/insurance/Truck')}}>
            <CCardImage orientation="top" src={pro3} />
            <CCardBody>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
            <CListGroup flush>
              <CListGroupItem>Cras justo odio</CListGroupItem>
              <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
              <CListGroupItem>Vestibulum at eros</CListGroupItem>
            </CListGroup>
            <CCardBody>
              <CCardLink href="#">Project link</CCardLink>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  );
};
