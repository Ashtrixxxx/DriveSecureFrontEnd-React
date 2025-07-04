import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import img from "../../Assets/Successful purchase-pana.png"
const PaymentSuccess = () => {

    const paymentData = JSON.parse(sessionStorage.getItem('paymentData'));
console.log(paymentData);
     const nav = useNavigate()
     
    const location = useLocation();
    const { state } = location; // Assuming you pass relevant state
    const token = localStorage.getItem("Auth-Token");
    let UserId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        UserId = decodedToken.nameid;
    }

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            // const paymentData = {
            //     PremiumAmount: paymentData.coverageAmount, // Use the coverage amount passed in the state
            //     PaymentDate: new Date().toISOString().split("T")[0],
            //     PaymentMethod: "Card",
            //     UserID: UserId,
            //     PolicyID: state.policyID, // Use the policy ID passed in the state
            // };

            try {
                await axios.post(
                    "https://localhost:7063/api/Payment/CreatePaymentDetails",
                    paymentData,
                    {
                        headers: {
                            Authorization: `bearer ${token}`
                        }
                    }
                );
                console.log("Payment success logged successfully.");
            } catch (error) {
                console.log("Error logging payment success:", error);
            }
        };

        handlePaymentSuccess();
    }, [paymentData]);

    return (
        <div>
            <center>
            <img src={img}/>
            <h1>Payment Successful!</h1>
            <p>Thank you for your payment.</p>
            <a href='/user'>GO back to dashboard page</a>
            </center>
        </div>
    );
};

export default PaymentSuccess;
