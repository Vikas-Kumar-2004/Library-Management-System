import React, { useState } from 'react';

const AddMembership = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    address: '',
    aadhar: '',
    startDate: '',
    endDate: '',
    duration: '6 months',
  });

  const handleSubmit = () => {
    const allFilled = Object.values(form).every(val => val !== '');
    if (!allFilled) {
      alert('All fields are required');
      return;
    }
    // ✅ Call API to add membership
    console.log('Membership added:', form);
  };

  return (
    <div>
      <h3>Add Membership</h3>

      <input
        placeholder="First Name"
        value={form.firstName}
        onChange={e => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        placeholder="Last Name"
        value={form.lastName}
        onChange={e => setForm({ ...form, lastName: e.target.value })}
      />
      <input
        placeholder="Contact"
        value={form.contact}
        onChange={e => setForm({ ...form, contact: e.target.value })}
      />
      <input
        placeholder="Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
      />
      <input
        placeholder="Aadhar"
        value={form.aadhar}
        onChange={e => setForm({ ...form, aadhar: e.target.value })}
      />
      <input
        type="date"
        value={form.startDate}
        onChange={e => setForm({ ...form, startDate: e.target.value })}
      />
      <input
        type="date"
        value={form.endDate}
        onChange={e => setForm({ ...form, endDate: e.target.value })}
      />

      <div>
        <label>
          <input
            type="radio"
            name="duration"
            value="6 months"
            checked={form.duration === '6 months'}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
          6 Months
        </label>
        <label>
          <input
            type="radio"
            name="duration"
            value="1 year"
            checked={form.duration === '1 year'}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
          1 Year
        </label>
        <label>
          <input
            type="radio"
            name="duration"
            value="2 years"
            checked={form.duration === '2 years'}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
          2 Years
        </label>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddMembership;
