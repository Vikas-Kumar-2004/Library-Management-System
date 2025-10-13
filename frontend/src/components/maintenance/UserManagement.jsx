import React, { useState } from 'react';

const UserManagement = () => {
  const [form, setForm] = useState({
    type: 'new',
    name: '',
    isAdmin: false,
    isActive: true,
  });

  const handleSubmit = () => {
    if (!form.name) return alert('Name is mandatory');
    // Call API to add/update user
  };

  return (
    <div>
      <h3>User Management</h3>
      <label><input type="radio" name="type" value="new" checked={form.type === 'new'} onChange={e => setForm({ ...form, type: e.target.value })} /> New User</label>
      <label><input type="radio" name="type" value="existing" onChange={e => setForm({ ...form, type: e.target.value })} /> Existing User</label>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <label><input type="checkbox" checked={form.isAdmin} onChange={e => setForm({ ...form, isAdmin: e.target.checked })} /> Admin</label>
      <label><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} /> Active</label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UserManagement;