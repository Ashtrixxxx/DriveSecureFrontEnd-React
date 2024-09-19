import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { Home } from "./Components/Home/Home";
import { Navbar } from "./Components/Navbar/Navbar";
import { Products } from "./Components/InsurancesAvailable/Insurances";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/Pages/HomePage";
import FormPage from "./Components/Pages/FormPage";
import Login from "./Components/Login/Login";
import SignUP from "./Components/Login/SignUP";

function App() {

  return (
    <div>
      <Login/>
      <SignUP/>
    <Router>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/insurance/:VehicleType" element={<FormPage/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
