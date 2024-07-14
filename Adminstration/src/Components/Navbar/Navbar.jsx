import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/images.png'
import navprofile from '../../assets/nav-profile.svg'

const Navbar = () => {
  const handlellogout=()=>{
      localStorage.removeItem('auto-token');
      window.location.replace('/adminlogin')
      console.log("token-removed")
  }
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" />
        <button onClick={handlellogout}> Logout</button>
        <img src={navprofile} alt="" />
      
    </div>
  )
}

export default Navbar
