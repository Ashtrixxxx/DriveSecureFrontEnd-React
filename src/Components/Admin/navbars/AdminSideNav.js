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

export const AdminSideNav = () => {
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
        <MDBIcon fas icon="bars" size="2x" />
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
              style={{
                color: "#fff",
                fontSize: "24px",
                textAlign: "center",
                marginBottom: "30px",
                marginLeft: "15px",
              }}
            >
              <MDBIcon fas icon="car" /> DriveSecure
            </MDBNavbarBrand>

            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/admin/dashboard"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <MDBIcon fas icon="tachometer-alt" /> Dashboard
                </MDBNavbarLink>
              </MDBNavbarItem>
              
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/admin/dashboard/Insurances"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <MDBIcon fas icon="file-alt" /> Policies
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink
                  href="/claims"
                  style={{ color: "#fff", marginLeft: "15px" }}
                >
                  <MDBIcon fas icon="file-signature" /> Claims
                </MDBNavbarLink>
              </MDBNavbarItem>
              
            </MDBNavbarNav>
            <div
              style={{ position: "absolute", bottom: "20px", width: "100%" }}
            >
              <button
                backgroundColor="#479ed8"
                block
                onClick={() => {
                  localStorage.removeItem("Admin-Token");
                  window.location.href = "/admin";
                }}
              >
                <MDBIcon fas icon="sign-out-alt" /> Logout
              </button>
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
