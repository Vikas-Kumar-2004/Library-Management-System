import React, { useState } from 'react';

const PayFine = () => {
  const [form, setForm] = useState({
    serialNo: '',
    issueDate: '',
    returnDate: '',
    actualReturnDate: '',
    fine: 0,
    finePaid: false,
    remarks: '',
  });

  const handleSubmit = () => {
    if (form.fine > 0 && !form.finePaid) {
      alert('Please confirm fine payment before proceeding');
      return;
    }
    // Call API to complete transaction
  };

  return (
    <div>
      <h3>Pay Fine</h3>
      <input placeholder="Serial No" onChange={e => setForm({ ...form, serialNo: e.target.value })} />
      <input type="date" placeholder="Issue Date" onChange={e => setForm({ ...form, issueDate: e.target.value })} />
      <input type="date" placeholder="Return Date" onChange={e => setForm({ ...form, returnDate: e.target.value })} />
      <input type="date" placeholder="Actual Return Date" onChange={e => setForm({ ...form, actualReturnDate: e.target.value })} />
      <input value={form.fine} disabled placeholder="Fine (auto)" />
      <label><input type="checkbox" checked={form.finePaid} onChange={e => setForm({ ...form, finePaid: e.target.checked })} /> Fine Paid</label>
      <textarea placeholder="Remarks (optional)" onChange={e => setForm({ ...form, remarks: e.target.value })} />
      <button onClick={handleSubmit}>Confirm</button>
    </div>
  );
};

export default PayFine;