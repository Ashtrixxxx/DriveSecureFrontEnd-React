import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Home } from '../Home/Home'
import Footer from '../Footer/Footer'
import { Insurances } from '../InsurancesAvailable/Insurances'
import Content from '../Home/Content'
import FlipCards from '../Home/FlipCards'
import Reviews from '../Home/Reviews'

const HomePage = () => {
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
