import React, { useState } from 'react'
import uploadarea from '../../assets/upload_area.svg'
import './Addproduct.css'

const Addproduct = () => {
  const [image,setiamge]=useState(false);
  const imagehandler=(e)=>{
    setiamge(e.target.files[0])
  }
  const [productdetails,setProductdetails]=useState({
    name:"",
    image:"",
    classNumber:1,
    RollNo:"",
    Phoneno:"",
  })
  const changehandler=(e)=>{
    const {name,value}=e.target;
   
   
    setProductdetails({...productdetails,[e.target.name]:e.target.value})
  }
  const ADD_product =async()=>{
    
      console.log(productdetails)
      let responsedata;
      let product=productdetails;
      let formdata=new FormData();
      formdata.append('product',image);
      await fetch('http://localhost:5000/upload',{
        method:'POST',
        headers:
        {
          Accept:'application/json',
        },
        body:formdata,
      }).then((resp)=>resp.json()).then((data)=>(responsedata=data))

      if(responsedata.success){
        product.image=responsedata.image_url;
        console.log(product);
      
        await fetch('http://localhost:5000/addstudent',{
        method:'POST',
        headers:
        {
          Accept:'application/json',
         'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product add"):alert("Failed")
      })
    }
    else
    {
        alert(responsedata.errors);
    }
      
  }
  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Student Name</p>
        <input value={productdetails.name} onChange={changehandler} type="text"  name='name' placeholder='Type here'/>
      </div>
      <div className="addproduct-price">
      <div className="addproduct-itemfield">
        <p>RollNO</p>
        <input value={productdetails.RollNo} onChange={changehandler} type='text' name='RollNo' placeholder='Type here'/>
      </div>
      <div className="addproduct-itemfield">
        <p>Phoneno</p>
        <input  value={productdetails.Phoneno} onChange={changehandler} type='text' name='Phoneno' placeholder='Type here'/>
      </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Class</p>
        <select value={productdetails.classNumber} onChange={changehandler} name='classNumber' className='addproduct-selector'>
        {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>{index + 1}</option>
          ))}
          </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
          <img src={image?URL.createObjectURL(image):uploadarea} alt="" className='addproduct-thumnail-img'  />
        </label>
        <input onChange={imagehandler} name='image' id='file-input' type='file' hidden />
      </div>
      <button onClick={()=>{ADD_product()}} className="addproduct-button">ADD</button>
    </div>
  )
}

export default Addproduct
