import React, { useEffect, useState } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./PaymentDetails.css"
import { useNavigate } from "react-router-dom";
// Load your Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51NMZV9SHrtHmWHnMzKN5XqHLYU5toN8BRmxrzHDV0bWq0dkW6av4nLXaOEEDVrLj1ugU1IXVi1BdiOcNVebL2vbH009nGIs1xp"
); // Replace with your Stripe public key

function PaymentDetails({ insurance, vehicle }) {
  const [amount, setAmount] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const nav = useNavigate();
  useEffect(() => {
    if (insurance && vehicle) {
      const amt = calculateAmount(insurance, vehicle);
      setAmount(amt);

      // Set payment date to today's date
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0]; // Format date as yyyy-mm-dd
      setPaymentDate(formattedDate);

      // Create payment intent
      createPaymentIntent(amt);
    }
  }, [insurance, vehicle]);

  const calculateAmount = (i, v) => {
    const coverageRates = {
      self: 0.02, // 2% of vehicle's value
      thirdParty: 0.01, // 1% of vehicle's value
      theft: 0.015, // 1.5% of vehicle's value
    };

    const start = new Date(i.coverageStartDate);
    const end = new Date(i.coverageEndDate);
    const coverageDuration = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    );

    let seatModifier = v.numberOfSeats > 5 ? 1.2 : 1.0;
    let serviceHistoryModifier = v.serviceHistory === "good" ? 0.9 : 1.1;
    let ownerModifier = v.numberOfPreviousOwners > 1 ? 1.15 : 1.0;

    const baseVehicleValue = v.listPrice;
    let baseInsuranceAmount =
      baseVehicleValue * (coverageRates[i.coverageType] || 0.01);

    let totalInsuranceAmount =
      baseInsuranceAmount *
      seatModifier *
      serviceHistoryModifier *
      ownerModifier *
      (coverageDuration / 365);

    return (totalInsuranceAmount * 100).toFixed(0); // Return amount in cents for Stripe
  };

  const createPaymentIntent = async (amt) => {
    try {
      console.log(amt.type); // Log the amount

      const response = await axios.post(
        `https://localhost:7063/api/Payments/CreatePaymentIntent`,
        { Amount: 500 }
      );
      console.log(response.data);

      const { clientSecret } = response.data; // Access data directly from response
      setClientSecret(clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const handlePayment = async () => {
    console.log("hi");

    if (!stripe || !elements) {
      return; // Stripe has not yet loaded
    }

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
          card: cardElement,
          billing_details: {
              name: "John Doe", // Replace with the actual customer name
              email: "johndoe@gmail.com", // Replace with the actual customer email
              address: {
                  line1: "123 Main St", // Replace with the actual address line
                  city: "Hyderabad", // Replace with the actual city
                  state: "Andhra Pradesh", // Replace with the actual state
                  postal_code: "500001", // Replace with the actual postal code
                  country: "IN", // Country code for India
              },
          },
      },
  });

    if (error) {
      console.error("Payment error:", error.message);
      alert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      nav("/")
    }

    setIsLoading(false);
  };

  return (
    <div className="details-wrapper">
      <MDBRow className="mb-4">
        <MDBCol>
          <p>Premium Amount: ${(amount / 100).toFixed(2)}</p>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-4">
        <MDBCol>
          <MDBInput
            id="paymentDate"
            label="Payment Date"
            type="date"
            value={paymentDate}
            disabled
          />
        </MDBCol>
      </MDBRow>

      {clientSecret && (
        <div>
          <CardElement
            className="card-element"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#333",
                  "::placeholder": {
                    color: "#999",
                  },
                },
                invalid: {
                  color: "#dc3545",
                },
                complete: {
                  color: "#28a745",
                },
              },
            }}
          />
          <MDBBtn onClick={handlePayment} disabled={isLoading} block>
            {isLoading ? "Processing..." : "Pay Now"}
          </MDBBtn>
        </div>
      )}
    </div>
  );
}

// Wrap your component in Elements provider to use Stripe
export default function StripeWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDetails {...props} />
    </Elements>
  );
}
