import React from 'react'
import { Link } from 'react-router-dom'

const NotAuthorizedPages = () => {
    console.log("hhi");
    
  return (
    <div>
      <h1>Your are not authorized to view this page </h1>
      <Link to="/"><a>Login to View this page</a></Link>
    </div>
  )
}

export default NotAuthorizedPages
