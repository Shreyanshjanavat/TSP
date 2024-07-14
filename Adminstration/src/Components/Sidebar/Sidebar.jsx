import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct_icon from'../../assets/Product_Cart.svg'
import listproduct_icon from '../../assets/Product_list_icon.svg'
const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <Link to ={'/addtoproduct'} style={{textDecoration:"none"}}>
        <div className='Sidebar-item'>
            <img src={addproduct_icon} alt=""></img>
            <p>AddStudent</p>
        </div>
      </Link>
      <Link to ={'/listproduct'} style={{textDecoration:"none"}}>
        <div className='Sidebar-item'>
            <img src={listproduct_icon} alt=""></img>
            <p>Showstdent</p>
        </div>
      </Link>
      <Link to ={'/Addteacher'} style={{textDecoration:"none"}}>
        <div className='Sidebar-item'>
            <img src={listproduct_icon} alt=""></img>
            <p>AddTeacher</p>
        </div>
      </Link>
      <Link to ={'/teachersdata'} style={{textDecoration:"none"}}>
        <div className='Sidebar-item'>
            <img src={listproduct_icon} alt=""></img>
            <p>Showteachers</p>
        </div>
      </Link>
      <Link to ={'/examresult'} style={{textDecoration:"none"}}>
        <div className='Sidebar-item'>
            <img src={listproduct_icon} alt=""></img>
            <p>ExamResult</p>
        </div>
      </Link>
      <Link to ={'/feestructure'} style={{textDecoration:"none"}}>
        <div className='Sidebar-item'>
            <img src={listproduct_icon} alt=""></img>
            <p>FeeStructure</p>
        </div>
      </Link>
     
    </div>
  )
}

export default Sidebar
