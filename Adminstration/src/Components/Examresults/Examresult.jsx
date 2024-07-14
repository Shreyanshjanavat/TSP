import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Examresult.css';

function Examresult() {
  const [formData, setFormData] = useState({
    name: '',
    Rollno: '',
    class: '',
    subjects: {
      English: '',
      Hindi: '',
      Socialscience: '',
      Science: '',
      Math: '',
      subject6: '',
    },
  });
  // alert("Please enter the rollno first");

  useEffect(() => {
    const fetchStudentData = async () => {
      if (formData.Rollno) {
        try {
          const response = await fetch(`http://localhost:5000/studentdata?RollNo=${formData.Rollno}`);
          const data = await response.json();
          if (data.length > 0) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              name: data[0].name,
              class: data[0].classNumber,
            }));
          } else {
            setFormData((prevFormData) => ({
              ...prevFormData,
              name: '',
              class: '',
            }));
          }
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      }
    };

    fetchStudentData();
  }, [formData.Rollno]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name in formData.subjects) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        subjects: {
          ...prevFormData.subjects,
        
          [name]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:5000/examdata', formData);
      console.log(response.data);
      if (response.data.success) {
        alert('Exam details added successfully');
      } else {
        alert('Failed to add exam details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
    }
  };

  return (
    <div className="container">
      <h1>Student Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} readOnly />
        </label>
        <br />
        <div className="row">
          <label>
            Class:
            <input type="text" name="class" value={formData.class} onChange={handleInputChange} readOnly />
          </label>
          <label>
            Roll No:
            <input type="text" name="Rollno" value={formData.Rollno} onChange={handleInputChange} />
          </label>
        </div>
        <br />
        <h2>Subjects:</h2>
        <div className="row">
          <label>
            English:
            <input type="Number" name="English" value={formData.subjects.English} onChange={handleInputChange} />
          </label>
          <label>
            Hindi:
            <input type="Number" name="Hindi" value={formData.subjects.Hindi} onChange={handleInputChange} />
          </label>
          <label>
            Social Science:
            <input
              type="Number"
              name="Socialscience"
              value={formData.subjects.Socialscience}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="row">
          <label>
            Science:
            <input type="Number" name="Science" value={formData.subjects.Science} onChange={handleInputChange} />
          </label>
          <label>
            Mathematics:
            <input type="Number" name="Math" value={formData.subjects.Math} onChange={handleInputChange} />
          </label>
          <label>
            Subject 6:
            <input type="Number" name="subject6" value={formData.subjects.subject6} onChange={handleInputChange} />
          </label>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Examresult;
