import React, { useState, useEffect } from 'react';

const Message = () => {
  const [selection, setSelection] = useState('');
  const [classes, setClasses] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selection === 'student' && selectedClass) {
      // Fetch students based on the selected class
      fetch(`http://localhost:5000/classdata?classNumber=${selectedClass}`)
        .then(response => response.json())
        .then(data => setStudents(data))
        .catch(error => console.error('Error fetching students:', error));
    }
  }, [selection, selectedClass]);

  useEffect(() => {
    if (selection === 'teacher') {
      // Fetch list of teachers
      fetch('http://localhost:5000/alldatateacher')
        .then(response => response.json())
        .then(data => setTeachers(data))
        .catch(error => console.error('Error fetching teachers:', error));
    }
  }, [selection]);

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
    setSelectedClass('');
    setStudents([]);
    setTeachers([]);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleStudentChange = (id) => {
    setSelectedStudent(id);
  };

  const handleTeacherChange = (id) => {
    setSelectedTeacher(id);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <h1>Select Student or Teacher</h1>
      <div>
        <label>
          <input
            type="radio"
            value="student"
            checked={selection === 'student'}
            onChange={handleSelectionChange}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            value="teacher"
            checked={selection === 'teacher'}
            onChange={handleSelectionChange}
          />
          Teacher
        </label>
      </div>

      {selection === 'student' && (
        <div>
          <div>
            <label>Select Class:</label>
            <select value={selectedClass} onChange={handleClassChange}>
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          {students.length > 0 && (
            <div>
              <h2>Students List:</h2>
              <ul>
                {students.map((student) => (
                  <li key={student.id} onClick={() => handleStudentChange(student.id)}>
                    <strong>Name:</strong> {student.name}<br />
                    <strong>Roll No:</strong> {student.RollNo}<br />
                    <strong>Class:</strong> {student.classNumber}<br />
                    <strong>Phone No:</strong> {student.Phoneno}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {selection === 'teacher' && teachers.length > 0 && (
        <div>
          <h2>Teachers List:</h2>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher.id} onClick={() => handleTeacherChange(teacher.id)}>
                <strong>Name:</strong> {teacher.name}<br />
                <strong>Subject:</strong> {teacher.subject}<br />
                <strong>Phone No:</strong> {teacher.phone}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2>Message:</h2>
        <textarea
          value={message}
          onChange={handleMessageChange}
          rows="4"
          cols="50"
          placeholder="Enter your message here..."
        />
      </div>
    </div>
  );
};

export default Message;
