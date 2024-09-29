import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
  const [pass, setPass] = useState("");
  const location = useLocation(); // Access the current URL
  const [token, setToken] = useState(null); // State to hold the token value
    const nav = useNavigate();
  useEffect(() => {
    // Use URLSearchParams to get the token from the query string
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token"); // Get the 'token' query param
    setToken(tokenParam); // Store the token in state
  }, [location.search]);

  const handleReset = () => {
    console.log(token);
    console.log(pass);
    
    
    const val = {
      token,
      pass,
    };

    try {
      const res = axios.post(
        `https://localhost:7063/api/User/ResetPassword/`,
        {
            token,
            password: pass
        }
      );

      nav("/login")
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="password"
        onChange={(event) => {
          setPass(event.target.value);
        }}
      />
      <button onClick={handleReset}>Reset My password</button>
    </div>
  );
};
