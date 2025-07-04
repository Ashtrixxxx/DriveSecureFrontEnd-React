import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
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
import { UserLayout } from "./Components/Pages/UserLayout";
import { DisplyVehicles } from "./Components/user/VehiclePages/DisplayVehicles";
import { DetailedVehicle } from "./Components/user/VehiclePages/DetailedVehicle";
import { AdminSideNav } from "./Components/Admin/navbars/AdminSideNav";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
import { AdminInsurances } from "./Components/Admin/insurancepages/AdminInsurances";
import { AdminLayout } from "./Components/Admin/navbars/AdminLayout";
import { AdminFilterList } from "./Components/Admin/insurancepages/AdminFilterList";
import { DetailedPolicy } from "./Components/Admin/insurancepages/DetailedPolicy";
import PaymentSuccess from "./Components/Pages/PaymentSuccess";
import Profile from "./Components/Navbar/Profile";
import { ResetPassword } from "./Components/Pages/ResetPassword";
import MotorInsuranceFAQ from "./Components/Navbar/MotorInsuranceFAQ";
import PageNotFound from "./Components/Pages/PageNotFound";
axios.defaults.baseURL = "http://localhost:7063";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard/*" element={<AdminLayout />}>
            <Route path="Insurances" element={<AdminInsurances />} />
            <Route path="AdminFilterList/:no" element={<AdminFilterList />} />
            <Route path="DetailedPolicy" element={<DetailedPolicy />} />
          </Route>

          {/* User Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUP />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/user/*" element={<UserLayout />}>
            <Route path="DisplayInsurances" element={<DisplayInsurances />} />
            <Route path="InsuranceDetails" element={<DetailedInsurance />} />
            <Route path="FilteredList/:no" element={<FilteredInsurance />} />
            <Route path="DetailedVehicle" element={<DetailedVehicle />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="DisplayVehicle" element={<DisplyVehicles />} />
            <Route path="faq" element={<MotorInsuranceFAQ />} />
          </Route>

          <Route path="/insurance/:VehicleType" element={<FormPage />} />
          <Route path="/not-authorized" element={<NotAuthorizedPages />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/user/dashboard" element={<SideNav />} />

          {/* Catch-all route for undefined URLs (404 Page) */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
