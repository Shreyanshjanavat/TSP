import React, { useState } from 'react';
import uploadarea from '../../assets/upload_area.svg';
import './Addteacher.css';

const Addproduct = () => {
  const [image, setimage] = useState(false);
  const [error, setError] = useState({
    phoneno: "",
  });
  const [productdetails, setProductdetails] = useState({
    name: "",
    image: "",
    phoneno: "",
    alternatephoneno: "",
    subject: "",
    age: "",
    gender: "male",
  });

  const imagehandler = (e) => {
    setimage(e.target.files[0]);
  };

  const changehandler = (e) => {
    const { name, value } = e.target;

    if (name === "phoneno" && value.length !== 13) {
      setError((prevError) => ({
        ...prevError,
        phoneno: "Phone number must be 13 characters long",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        phoneno: "",
      }));
    }

    setProductdetails({ ...productdetails, [name]: value });
  };

  const ADD_product = async () => {
    console.log(productdetails);
    let responsedata;
    let product = productdetails;
    let formdata = new FormData();
    formdata.append('product', image);
    await fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formdata,
    }).then((resp) => resp.json()).then((data) => (responsedata = data));

    if (responsedata.success) {
      product.image = responsedata.image_url;
      console.log(product);

      await fetch('http://localhost:5000/Addteacher', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Teacher Detail Add") : alert("Failed");
      });
    } else {
      alert(responsedata.errors);
    }
  };

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Teacher Name</p>
        <input value={productdetails.name} onChange={changehandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Phone No</p>
          <input value={productdetails.phoneno} onChange={changehandler} type='text' name='phoneno' placeholder='Type here' />
          {error.phoneno && <p className="error-message">{error.phoneno}</p>}
        </div>
        <div className="addproduct-itemfield">
          <p>WhatsApp No</p>
          <input value={productdetails.alternatephoneno} onChange={changehandler} type='text' name='alternatephoneno' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Subject</p>
          <input value={productdetails.subject} onChange={changehandler} type='text' name='subject' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Age</p>
          <input value={productdetails.age} onChange={changehandler} type='text' name='age' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <select value={productdetails.gender} onChange={changehandler} name='gender' className='addproduct-selector'>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : uploadarea} alt="" className='addproduct-thumnail-img' />
        </label>
        <input onChange={imagehandler} name='image' id='file-input' type='file' hidden />
      </div>
      <button onClick={ADD_product} className="addproduct-button">ADD</button>
    </div>
  );
};

export default Addproduct;
