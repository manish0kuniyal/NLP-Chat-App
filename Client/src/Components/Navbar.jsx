import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='border-2'>
        <Link to='/'>home</Link>
        
        <Link to='/chat'>chat</Link>
    </div>
  )
}

export default Navbar