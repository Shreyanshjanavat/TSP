import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Admin from './Admin'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Addproduct from '../../Components/Addproducts/Addproduct'
import Listproduct from '../../Components/Listproduct/Listproduct'

const Admin1 = () => {
  return (
    <div className='admin1'>
      
      <Navbar/>
      <Admin/>
      
    </div>
  )
}

export default Admin1
