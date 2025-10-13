// src/components/transactions/ReturnBook.jsx
import React, { useState } from 'react';

const ReturnBook = () => {
  const [form, setForm] = useState({
    bookName: '',
    authorName: '',
    serialNo: '',
    issueDate: '',
    returnDate: '',
    remarks: '',
  });

  const handleSubmit = () => {
    if (!form.bookName || !form.serialNo || !form.returnDate) {
      alert('Please fill all mandatory fields');
      return;
    }
    // Redirect to PayFine page or call API
    console.log('Return submitted:', form);
  };

  return (
    <div>
      <h3>Return Book</h3>

      {/* Book Name */}
      <div>
        <label>Book Name:</label>
        <select onChange={(e) => setForm({ ...form, bookName: e.target.value })}>
          <option value="">Select Book</option>
          <option value="Physics Basics">Physics Basics</option>
          <option value="Economics 101">Economics 101</option>
          {/* Add more options dynamically */}
        </select>
      </div>

      {/* Author Name */}
      <div>
        <label>Author Name:</label>
        <textarea
          value={form.authorName}
          disabled
          placeholder="Auto-filled"
        />
      </div>

      {/* Serial No */}
      <div>
        <label>Serial No:</label>
        <select onChange={(e) => setForm({ ...form, serialNo: e.target.value })}>
          <option value="">Select Serial No</option>
          <option value="SC(B)000001">SC(B)000001</option>
          <option value="EC(B)000002">EC(B)000002</option>
          {/* Add more options dynamically */}
        </select>
      </div>

      {/* Issue Date */}
      <div>
        <label>Issue Date:</label>
        <input
          type="text"
          value={form.issueDate}
          disabled
          placeholder="Auto-filled"
        />
      </div>

      {/* Return Date */}
      <div>
        <label>Return Date:</label>
        <input
          type="date"
          onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
        />
      </div>

      {/* Remarks */}
      <div>
        <label>Remarks (optional):</label>
        <textarea
          placeholder="Any notes..."
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
        />
      </div>

      <button onClick={handleSubmit}>Confirm Return</button>
    </div>
  );
};

export default ReturnBook;