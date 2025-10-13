import React, { useState } from 'react';

const IssueBook = () => {
  const [form, setForm] = useState({
    bookName: '',
    authorName: '',
    issueDate: '',
    returnDate: '',
    remarks: '',
  });

  const today = new Date().toISOString().split('T')[0];
  const defaultReturn = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!form.bookName || !form.issueDate || !form.returnDate) {
      alert('Please fill all mandatory fields');
      return;
    }
    // Call API to issue book
  };

  return (
    <div>
      <h3>Issue Book</h3>
      <input placeholder="Book Name" onChange={e => setForm({ ...form, bookName: e.target.value })} />
      <input value={form.authorName} disabled placeholder="Author Name (auto)" />
      <input type="date" min={today} onChange={e => setForm({ ...form, issueDate: e.target.value })} />
      <input type="date" defaultValue={defaultReturn} onChange={e => setForm({ ...form, returnDate: e.target.value })} />
      <textarea placeholder="Remarks (optional)" onChange={e => setForm({ ...form, remarks: e.target.value })} />
      <button onClick={handleSubmit}>Confirm Issue</button>
    </div>
  );
};

export default IssueBook;