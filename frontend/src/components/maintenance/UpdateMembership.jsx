import React, { useState } from 'react';

const UpdateMembership = () => {
  const [membershipId, setMembershipId] = useState('');
  const [action, setAction] = useState('extend');

  const handleSubmit = () => {
    if (!membershipId) return alert('Membership Number is required');
    // Call API to update membership
  };

  return (
    <div>
      <h3>Update Membership</h3>
      <input placeholder="Membership Number" onChange={e => setMembershipId(e.target.value)} />
      <div>
        <label><input type="radio" name="action" value="extend" checked={action === 'extend'} onChange={e => setAction(e.target.value)} /> Extend</label>
        <label><input type="radio" name="action" value="cancel" onChange={e => setAction(e.target.value)} /> Cancel</label>
      </div>
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default UpdateMembership;