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
import axios from "axios";
import { SideNav } from "./Components/Navbar/SideNav";
import { DisplayInsurances } from "./Components/user/InsurancePages/DisplayInsurances";
import { DetailedInsurance } from "./Components/user/InsurancePages/DetailedInsurance";
import { FilteredInsurance } from "./Components/user/InsurancePages/FilteredInsurance";
import NotAuthorizedPages from "./Components/Pages/NotAuthorizedPages";
axios.defaults.baseURL = "http://localhost:7063";
axios.defaults.withCredentials = true;
function App() {

  return (
    <div>
      <SideNav/>
    <Router>

      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/Signup" element={<SignUP />}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/insurance/:VehicleType" element={<FormPage/>}/>
        <Route path="/user/DisplayInsurances" element={<DisplayInsurances/>}/>
        <Route path="/user/InsuranceDetails" element={<DetailedInsurance/>}/>
        <Route path="/user/FilteredList/:no" element={<FilteredInsurance />}/>
        <Route path="/not-authorized" element={<NotAuthorizedPages/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
