import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Home } from '../Home/Home'
import Footer from '../Footer/Footer'
import { Insurances } from '../InsurancesAvailable/Insurances'
import Content from '../Home/Content'
import FlipCards from '../Home/FlipCards'
import Reviews from '../Home/Reviews'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
const HomePage = () => {

  
  const token = localStorage.getItem('authToken');
const navigate = useNavigate();
console.log(token);

if (token) {
const decodedToken = jwtDecode(token);

    // Check if token has expired
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (decodedToken.exp < currentTime) {
        // Show toast notification
        toast.error("Session has expired. Please log in again.");

        // Remove expired token
        localStorage.removeItem('authToken');

        // Redirect user to login page
        navigate('/login');
    } else {
        console.log('Token is still valid');
    }
} else {
    console.log('No token found');
}


  return (
    <div>
      <Navbar/>
      <Home/>
      <Insurances />
      <Content/>
      <FlipCards/>
      <Reviews/>
      <Footer/>
    </div>
  )
}

export default HomePage
