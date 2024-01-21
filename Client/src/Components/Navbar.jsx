import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className=' mx-[10%] flex text-green-600 underline my-4 mb-4'>
        <Link to='/' className='mr-8 '>HOME</Link>
        
        <Link to='/chat'>CHAT</Link>
    </div>
  )
}

export default Navbar