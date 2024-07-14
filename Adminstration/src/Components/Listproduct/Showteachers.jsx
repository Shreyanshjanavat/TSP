import React from 'react'
import './Showstudents.css'
import { useState,useEffect } from 'react';
import remove_icon from '../../assets/cross_icon.png'

const Showteachers = () => {
  const [allproducts,setallproducts]=useState([]);
  const fetchinfo=async()=>{
    await fetch('http://localhost:5000/teacherdata')
    .then((res)=>(res.json()))
    .then((data)=>{setallproducts(data)})
  }
  useEffect(()=>{
    fetchinfo()
  },[])
  const removeproduct=async(id)=>{
    await fetch('http://localhost:5000/teacherremoved',{
      method:"POST",
      headers:{
       Accept:'application/json',
       'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchinfo();
  }
  return (
    <div className="list-product">
      <p> All Product List</p>
      <div className="list-format-main">
        <p>Teacher</p>
        <p>TeacherName</p>
        <p>Subject</p>
        <p>Phoneno</p>
        <p>Remove</p>
      </div>
      <div className="lsitproduct-allproduct">
        <hr/>
        {allproducts.map((product,index)=>{
            return <div key={index} className='list-format-main listproduct-format'>
              <img src={product.image} alt=" " className='listproduct-image'/>
              <p>{product.name}</p>
              <p>{product.subject}</p>
              <p>{product.phoneno}</p>
              {/* <img src={product.image} alt=" " className='listproduct-image'/> */}
            
              <img src={remove_icon}  onClick={()=>{removeproduct(product.id)}} className='remove-icon'/>
            </div>
          

      
        })}
      </div>
    </div>
  )
}

export default Showteachers
