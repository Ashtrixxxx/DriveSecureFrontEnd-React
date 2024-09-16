import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Home } from '../Home/Home'
import { Products } from '../InsurancesAvailable/Insurances'
import Footer from '../Footer/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Products/>
      <Footer/>
    </div>
  )
}

export default HomePage
