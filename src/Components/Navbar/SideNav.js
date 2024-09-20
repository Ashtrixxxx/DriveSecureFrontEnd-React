import React ,{useState} from "react";
import { MDBContainer,MDBNavbar,MDBNavbarBrand, MDBNavbarNav,MDBNavbarItem,MDBNavbarLink,MDBIcon,MDBBtn } from "mdb-react-ui-kit";

export const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    

    const toggleSideNav = () => {
        setIsOpen(!isOpen);
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
              href="/"
              style={{
                color: "#fff",
                fontSize: "24px",
                textAlign: "center",
                marginBottom: "30px",
              }}
            >
              <MDBIcon fas icon="car" /> DriveSecure
            </MDBNavbarBrand>

            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink href="/dashboard" style={{ color: "#fff" }}>
                  <MDBIcon fas icon="tachometer-alt" /> Dashboard
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/vehicles" style={{ color: "#fff" }}>
                  <MDBIcon fas icon="car" /> Vehicles
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/policies" style={{ color: "#fff" }}>
                  <MDBIcon fas icon="file-alt" /> Policies
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/claims" style={{ color: "#fff" }}>
                  <MDBIcon fas icon="file-signature" /> Claims
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/profile" style={{ color: "#fff" }}>
                  <MDBIcon fas icon="user" /> Profile
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <div style={{ position: "absolute", bottom: "20px", width: "100%" }}>
              <MDBBtn
                color="danger"
                block
                onClick={() => {
                  localStorage.removeItem("Auth-Token");
                  window.location.href = "/login"; 
                }}
              >
                <MDBIcon fas icon="sign-out-alt" /> Logout
              </MDBBtn>
      </div>

     </>
        )}
        </div>
        <div style={{ marginLeft: isOpen ? "250px" : "0", padding: "20px", transition: "0.5s" }}>
        
      </div>
    </div>   
);


};