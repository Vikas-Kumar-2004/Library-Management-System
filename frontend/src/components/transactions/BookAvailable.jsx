// src/components/transactions/BookAvailable.jsx
import React, { useState } from 'react';

const BookAvailable = () => {
  const [form, setForm] = useState({ bookName: '', category: '' });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!form.bookName && !form.category) {
      setError('Please enter a book name or select a category.');
      return;
    }
    setError('');
    // Call API to check availability
    console.log('Searching for:', form);
  };

  return (
    <div>
      <h3>Check Book Availability</h3>
      <div>
        <label>Book Name:</label>
        <input
          type="text"
          value={form.bookName}
          onChange={(e) => setForm({ ...form, bookName: e.target.value })}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Science">Science</option>
          <option value="Economics">Economics</option>
          <option value="Fiction">Fiction</option>
          <option value="Children">Children</option>
          <option value="Personal Development">Personal Development</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BookAvailable;