import React, { useState } from 'react';
import './FeeStructure.css';

function FeeStructure() {
  const [ClassNumber, setClassNumber] = useState('');
  const [Fee, setFee] = useState('');
  const [DueDate, setDueDate] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleClassNumberChange = (event) => {
    setClassNumber(event.target.value);
  };

  const handleFeeChange = (event) => {
    setFee(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (ClassNumber === '' || Fee === '' || DueDate === '') {
      setFeedback('Please select a class, add Fee, and select a due date.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/addfee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ClassNumber: ClassNumber,
          Fee: Fee,
          DueDate: DueDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFeedback('Fee information added successfully!');
      } else {
        setFeedback('There was an error adding the fee information.');
      }

      // Clear the form after submission
      setClassNumber('');
      setFee('');
      setDueDate('');
    } catch (error) {
      console.log('Error in adding fee information:', error);
      setFeedback('There was an error adding the fee information.');
    }
  };

  return (
    <div className='feecontainor'>
      <h1>Class and Fee Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Class Number:</label>
          <select value={ClassNumber} onChange={handleClassNumberChange}>
            {Array.from(Array(10).keys()).map((num) => (
              <option key={num} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label>Fee:</label>
          <input type="number" value={Fee} onChange={handleFeeChange} />
        </div>
        <br />
        <div>
          <label>Due Date:</label>
          <input type="date" value={DueDate} onChange={handleDueDateChange} />
        </div>
        <br />
        <button type="submit">Submit</button>
        <p style={{ color: 'red' }}>{feedback}</p>
      </form>
    </div>
  );
}

export default FeeStructure;
