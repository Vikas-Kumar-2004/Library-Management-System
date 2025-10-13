import React, { useEffect, useState } from 'react';

const MasterListMemberships = () => {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    // Fetch memberships from API
    setMemberships([
      { id: 'M001', name: 'Vikrant Sharma', contact: '9876543210', address: 'Sadar, UP', aadhar: '1234-5678-9012', start: '2025-01-01', end: '2025-07-01', status: 'Active', fine: '₹0' },
      // Add more mock or fetched data
    ]);
  }, []);

  return (
    <div>
      <h3>Master List of Memberships</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Contact</th><th>Address</th><th>Aadhar</th><th>Start</th><th>End</th><th>Status</th><th>Fine</th>
          </tr>
        </thead>
        <tbody>
          {memberships.map((m, idx) => (
            <tr key={idx}>
              <td>{m.id}</td><td>{m.name}</td><td>{m.contact}</td><td>{m.address}</td><td>{m.aadhar}</td><td>{m.start}</td><td>{m.end}</td><td>{m.status}</td><td>{m.fine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MasterListMemberships;