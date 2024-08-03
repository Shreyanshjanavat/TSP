import React, { useState, useEffect } from 'react';
import './EditStudentdetails.css';

const EditStudentdetails = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchEditStudentdetails = async () => {
      if (!selectedClass) return;
      try {
        const response = await fetch(`http://localhost:5000/classdata?classNumber=${selectedClass}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchEditStudentdetails();
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleChange = (e, studentId) => {
    const { name, value } = e.target;
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === studentId ? { ...student, [name]: value } : student
      )
    );
  };

  const handleSave = async (studentId) => {
    const student = students.find((s) => s._id === studentId);
    const { name, RollNo, classNumber, Phoneno } = student;

    try {
      const response = await fetch('http://localhost:5000/updatestudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: studentId, name, RollNo, classNumber, Phoneno }),
      });

      if (response.ok) {
        alert('Student details updated successfully!');
      } else {
        alert('Failed to update student details');
      }
    } catch (error) {
      console.error('Error updating student details:', error);
      alert('Failed to update student details');
    }
  };

  const handleDelete = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:5000/deletestudent?id=${studentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId));
        alert('Student deleted successfully!');
      } else {
        alert('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  const handleUpdateClass = async () => {
    const newClassNumber = parseInt(selectedClass);

    if (newClassNumber >= 10) {
      alert('Class number cannot exceed 10');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/updateclass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ classNumber: newClassNumber }),
      });

      if (response.ok) {
        setSelectedClass((newClassNumber + 1).toString()); // Update state to reflect the new class number
        alert('Class updated successfully');
      } else {
        alert('Failed to update class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
      alert('Failed to update class');
    }
  };

  return (
    <div className="student-details">
      <button className="update-class-button" onClick={handleUpdateClass}>Update Class</button>
      <h1>Edit Student Details</h1>
      <div className="input-group">
        <label htmlFor="classNumber">Select Class:</label>
        <select
          id="classNumber"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      {students.length > 0 ? (
        students.map((student) => (
          <div key={student._id} className="student-form">
            
            <div className="input-row">
              <div className="input-group">
                <label htmlFor={`name-${student._id}`}>Name:</label>
                <input
                  type="text"
                  id={`name-${student._id}`}
                  name="name"
                  value={student.name}
                  onChange={(e) => handleChange(e, student._id)}
                />
              </div>
              <div className="input-group">
                <label htmlFor={`rollNo-${student._id}`}>Roll No:</label>
                <input
                  type="text"
                  id={`rollNo-${student._id}`}
                  name="RollNo"
                  value={student.RollNo}
                  onChange={(e) => handleChange(e, student._id)}
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor={`classNumber-${student._id}`}>Class:</label>
                <input
                  type="text"
                  id={`classNumber-${student._id}`}
                  name="classNumber"
                  value={student.classNumber}
                  onChange={(e) => handleChange(e, student._id)}
                />
              </div>
              <div className="input-group">
                <label htmlFor={`Phoneno-${student._id}`}>Phoneno:</label>
                <input
                  type="text"
                  id={`Phoneno-${student._id}`}
                  name="Phoneno"
                  value={student.Phoneno}
                  onChange={(e) => handleChange(e, student._id)}
                />
              </div>
            </div>
            <div className="button-group">
              <button className="save-button" onClick={() => handleSave(student._id)}>Save</button>
              <button className="delete-button" onClick={() => handleDelete(student._id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No students found for class {selectedClass}</p>
      )}
    </div>
  );
};

export default EditStudentdetails;

