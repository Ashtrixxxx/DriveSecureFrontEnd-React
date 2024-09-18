import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./Components/Home/Home";
import { Navbar } from "./Components/Navbar/Navbar";
import { Products } from "./Components/InsurancesAvailable/Insurances";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Components/Pages/HomePage";
import FormPage from "./Components/Pages/FormPage";

function App() {
  return (
    <div>
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
