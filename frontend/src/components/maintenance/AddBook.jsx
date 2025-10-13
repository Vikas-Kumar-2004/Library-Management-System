import React, { useState } from 'react';

const AddBook = () => {
  const [form, setForm] = useState({
    type: 'book',
    name: '',
    date: '',
    quantity: 1,
    category: '',
    status: '',
  });

  const handleSubmit = () => {
    const allFilled = Object.values(form).every(val => val !== '');
    if (!allFilled) return alert('All fields are mandatory');
    // Call API to add book/movie
  };

  return (
    <div>
      <h3>Add Book/Movie</h3>
      <label><input type="radio" name="type" value="book" checked={form.type === 'book'} onChange={e => setForm({ ...form, type: e.target.value })} /> Book</label>
      <label><input type="radio" name="type" value="movie" onChange={e => setForm({ ...form, type: e.target.value })} /> Movie</label>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
      <input placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Status" onChange={e => setForm({ ...form, status: e.target.value })} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddBook;