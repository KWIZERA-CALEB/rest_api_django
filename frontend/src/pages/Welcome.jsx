import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
      Get Started
      <Link to={'/login'}>Login</Link>
    </div>
  )
}

export default Welcome
