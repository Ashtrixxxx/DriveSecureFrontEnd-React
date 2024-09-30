import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./Navbar.css"
//Import Material Icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
export const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideNav = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div
        style={{
          padding: "10px",
          cursor: "pointer",
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
        onClick={toggleSideNav}
      >
        <span className="material-icons">menu</span>
      </div>

      <div
        style={{
          width: isOpen ? "250px" : "0", // Show or hide side nav
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#343a40",
          overflowX: "hidden",
          transition: "0.5s",
          paddingTop: isOpen ? "100px" : "0",
        }}
      >
        {isOpen && (
          <>
            <MDBNavbarBrand
              href="/"
              style={{
                color: "#fff",
                fontSize: "24px",
                textAlign: "center",
                marginBottom: "30px",
                marginLeft: "15px",
              }}
            >
              <DirectionsCarOutlinedIcon /> DriveSecure
            </MDBNavbarBrand>

            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/user/dashboard"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <DashboardOutlinedIcon /> Dashboard
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/user/DisplayVehicle"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <DirectionsCarOutlinedIcon /> Vehicles
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/user/DisplayInsurances"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <DescriptionOutlinedIcon /> Policies
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/claims"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <AssignmentOutlinedIcon /> Claims
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/user/Profile"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <AccountCircleOutlinedIcon /> Profile
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/user/faq"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <AccountCircleOutlinedIcon /> FAQ 
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                width: "100%",
                backgroundColor: "#9A1750",
              }}
            >
              <MDBBtn className="logout-btn"
                backgroundColor="#9A1750" 
                block
                onClick={() => {
                  localStorage.removeItem("Auth-Token");
                  window.location.href = "/login";
                }}
              >
                <LogoutOutlinedIcon /> Logout
              </MDBBtn>
            </div>
          </>
        )}
      </div>
      <div
        style={{
          marginLeft: isOpen ? "250px" : "0",
          padding: "20px",
          transition: "0.5s",
        }}
      ></div>
    </div>
  );
};
