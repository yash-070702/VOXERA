import React from 'react'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const HomePage = () => {
  const {token}=useSelector((state)=>state.auth)
  const navigate=useNavigate()
  return (
    
    <div  className='flex items-center justify-center w-[100vw] h-[100vh] gap-4'>
    {!token &&
      <div className="gap-4 flex">    <Link to="/auth/login"> <button>LOGIN </button></Link>
      <Link to="/auth/signup"> <button>SINGUP </button></Link></div>

    }
    {
      token && <Link to="/user/app"><button>ChatApp</button></Link>
    }
    </div>
  )
}

export default HomePage
