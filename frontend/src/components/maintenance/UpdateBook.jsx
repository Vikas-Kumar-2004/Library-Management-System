import React, { useState } from 'react';

const UpdateBook = () => {
  const [form, setForm] = useState({
    type: 'book',
    serialNo: '',
    name: '',
    date: '',
    status: '',
  });

  const handleSubmit = () => {
    const allFilled = Object.values(form).every(val => val !== '');
    if (!allFilled) return alert('All fields are mandatory');
    // Call API to update book/movie
  };

  return (
    <div>
      <h3>Update Book/Movie</h3>
      <label><input type="radio" name="type" value="book" checked={form.type === 'book'} onChange={e => setForm({ ...form, type: e.target.value })} /> Book</label>
      <label><input type="radio" name="type" value="movie" onChange={e => setForm({ ...form, type: e.target.value })} /> Movie</label>
      <input placeholder="Serial No" onChange={e => setForm({ ...form, serialNo: e.target.value })} />
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
      <input placeholder="Status" onChange={e => setForm({ ...form, status: e.target.value })} />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default UpdateBook;