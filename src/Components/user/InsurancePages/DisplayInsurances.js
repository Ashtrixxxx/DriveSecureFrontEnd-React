import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FilterInsurance } from "./FilterInsurance";
import { SideNav } from "../../Navbar/SideNav";
import "./DisplayInsurances.css";
import { loadStripe } from "@stripe/stripe-js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap"; // Use react-bootstrap's Modal and Button

export const DisplayInsurances = () => {
  const stripePromise = loadStripe(
    "pk_test_51NMZV9SHrtHmWHnMzKN5XqHLYU5toN8BRmxrzHDV0bWq0dkW6av4nLXaOEEDVrLj1ugU1IXVi1BdiOcNVebL2vbH009nGIs1xp"
  );
  const [insuranceData, setInsuranceData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
 

  const token = localStorage.getItem("Auth-Token");
  const nav = useNavigate();

  const filterSubmit = (data) => {
    setInsuranceData((prev) => [...prev, data]);
  };

  let UserId = null;
  if (token) {
    const decodedToken = jwtDecode(token);
    UserId = decodedToken.nameid;
  }

  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7063/api/Policy/GetAllPolicies/${UserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setInsuranceData(response.data);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 401)
        ) {
          // If the error is 400 or 401, navigate to 'Not Authorized' page
          nav("/not-authorized");
        } else {
          console.log("An error occurred", error);
        }
        console.log(error);
      }
    };

    fetchInsurances();
  }, []);

  

  const handlePayment = async (item) => {
    console.log(item.coverageAmount);

    
    
    try {
      // Prepare the request body according to the expected format
      const requestBody = {
        lineItems: [
          {
            price_data: {
              currency: "inr", // Setting currency to INR
              product_data: {
                name: "Insurance", // Product name
              },
              unitAmount: Math.round(item.coverageAmount * 100), // Price in paise (1 INR = 100 paise)
            },
            quantity: 1, // Set quantity
          },
        ],
        customerName: "John Doe", // Dummy customer name
        customerEmail: "johndoe@example.com", // Dummy customer email
        customerAddress: {
          line1: "123 Test Street", // Dummy address line 1
          city: "Test City", // Dummy city
          state: "Test State", // Dummy state
          postalCode: "123456", // Dummy postal code
          country: "IN", // Dummy country code
        },
      };

      console.log(requestBody);
      
      const sessionResponse = await axios.post(
        "https://localhost:7063/api/Payments/create-checkout-session",
        requestBody, // Send the structured request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const paymentData = {
        PremiumAmount: item.coverageAmount, // The premium amount as received
        PaymentDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        PaymentMethod: "Card", // Assuming the payment method is Card
        UserID: UserId,
        PolicyID: item.policyID,
      };

      sessionStorage.setItem('paymentData', JSON.stringify(paymentData));


      const stripe = await stripePromise; // Await the Stripe object
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionResponse.data.sessionId,
      });
     


      if (error) {
        console.error("Error during checkout:", error);
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
    }
  };
  
  //Function to open the modal and set the selected insurance
  const handleShowDetails = (insurance) => {
    setSelectedInsurance(insurance);
    setShowModal(true);
  };

  //Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
console.log(insuranceData);

  return (
    <div>
      <button
        onClick={() => {
          setShowFilter(!showFilter);
        }}
        style={{ width: "fit-content", height: "fit-content" }}
      >
        Filter
      </button>
      {showFilter && <FilterInsurance list={insuranceData} />}
      {insuranceData.map((item, index) => (
      
        <div key={index}>
          <div className="card">
            <div className="card-header">Policies</div>
            <div className="card-body">
              <h5 className="card-title">Policy ID: {item.policyID}</h5>
              <p className="card-text">Coverage Type: {item.coverageType}</p>
              <p className="card-text">
                Coverage Amount: {item.coverageAmount}
              </p>



             

              {item.status == 0 && (
                <p className="card-text">
                  Your Quota hasn't been viewed by the admin yet
                </p>
              )}
              {item.status == 1 && (
                <p className="card-text">
                  Your Quota has been viewed by the admin
                </p>
              )}
              {item.status == 2 && (
                <p className="card-text">Your Quota has been accepted</p>
              )}
              {item.status == 3 && (
                <p className="card-text">
                  Your Quota has been rejected for a set of reasons pls check
                  the mail
                </p>
              )}
              {item.status == 4 && (
                <p className="card-text">
                  Your Quota has been accepted and the payment has been done
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                 <button
                style={{
                  backgroundColor: "#9A1750",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                }}
                onClick={() => handleShowDetails(item)}
              >
                Show Details
              </button>
                {false &&
                <button
                  style={{
                    backgroundColor: "#9A1750",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  className="btn btn-primary"
                  onClick={() => {
                    nav("/user/InsuranceDetails", {
                      state: { insurance: item },
                    });
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#BB3671")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#9A1750")
                  }
                >
                  Show Details
                </button>
}
                {item.status === 2 && (
                  <button
                    style={{
                      backgroundColor: "#FF5722",
                      color: "#fff",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#FF7043")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#FF5722")
                    }
                    onClick={() => handlePayment(item)}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal for showing insurance details */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop={true} keyboard={true}>
        <Modal.Header closeButton>
          <Modal.Title>Insurance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInsurance && (
            <div>
              <h5>Policy ID: {selectedInsurance.policyID}</h5>
              <p>Coverage Type: {selectedInsurance.coverageType}</p>
              <p>Coverage Amount: {selectedInsurance.coverageAmount}</p>
              <p>Status: {selectedInsurance.status}</p>
              <p className="card-text">Coverage Start Date: {selectedInsurance.coverageStartDate}</p>
              <p className="card-text">Coverage End Date: {selectedInsurance.coverageEndDate}</p>

            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
