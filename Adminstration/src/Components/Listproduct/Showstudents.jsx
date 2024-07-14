import React, {useState, useContext,useEffect } from 'react'
import { Indexnumber } from '../../Boxes/Boxes';
import { useParams } from "react-router-dom";
import './Showstudents.css'
import remove_icon from '../../assets/cross_icon.png'

const Showstudents = () => {
  const { index } = useParams();
  const [classStudents, setclassStudents] = useState([]);

  const fetchinfowithparameter = async (classNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/classdata?classNumber=${classNumber}`);
      const data = await response.json();
      setclassStudents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (index !== undefined) {
      fetchinfowithparameter(index);
    }
  }, [index]);
  const removestudent=async(id)=>{
    const isConfirmed = window.confirm('Are you sure you want to remove this student?');
    if(isConfirmed){
    await fetch('http://localhost:5000/removestudent',{
      method:"POST",
      headers:{
       Accept:'application/json',
       'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
  }
    await fetchinfo();
  }

      return (
    <div className='student-container'>
        <div className="list-product">
      <p> All Student List of {index}</p>
      <div className="list-format-main">
        <p>Student</p>
        <p>Student name</p>
        <p>RollNo</p>
        <p>Phoneno</p>
        <p>Remove</p>
      </div>
      <div className="lsitproduct-allproduct">
        <hr/>
        {classStudents.map((product,index)=>{
            return <div key={index} className='list-format-main listproduct-format'>
              <img src={product.image} alt=" " className='listproduct-image'/>
              <p>{product.name}</p>
              <p>{product.RollNo}</p>
              <p>{product.Phoneno}</p>
              {/* <p>{product.class}</p> */}
              <img src={remove_icon}  onClick={()=>{removestudent(product.id)}} className='remove-icon'/>
            </div>
          

      
        })}
      </div>
    </div>
    </div>
  )
}

export default Showstudents
