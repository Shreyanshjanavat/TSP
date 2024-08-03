import React from 'react'
import { useState } from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes, UNSAFE_DataRouterContext } from 'react-router-dom'
import Addproduct from '../../Components/Addproducts/Addproduct'
import Listproduct from '../../Components/Listproduct/Listproduct'

import Showstudents from '../../Components/Listproduct/Showstudents'
import Addteacher from '../../Components/Addteacher/Addteacher'
import Showteachers from '../../Components/Listproduct/Showteachers'
import Examresult from '../../Components/Examresults/Examresult'
import FeeStructure from '../../Components/FeeStructure/FeeStructure'
import EditStudentdetails from '../../Components/EditDetails/EditStudentdetails'


const Admin = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
     
        <Route path='/addtoproduct' element={<Addproduct/>}/>
        <Route path='/editstudentdata' element={<EditStudentdetails/>}/>
        <Route path='/listproduct' element={<Listproduct/>}/>
        <Route path='/examresult' element={<Examresult/>}/>
        <Route path='/showstudent/:index' element={<Showstudents index={selectedIndex}/>}/>
        <Route path='/Addteacher' element={<Addteacher/>}/>
        <Route path='/teachersdata' element={<Showteachers/>}/>
        <Route path='/feestructure' element={<FeeStructure/>}/>
     
      </Routes>
    </div>
  )
}

export default Admin
