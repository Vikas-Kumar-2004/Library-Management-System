import React, { useEffect, useState } from 'react';

const OverdueReturns = () => {
  const [overdues, setOverdues] = useState([]);

  useEffect(() => {
    // Fetch overdue returns from API
    setOverdues([
      { serialNo: 'EC(B)000003', name: 'Economics 101', memberId: 'M002', issueDate: '2025-09-15', returnDate: '2025-09-30', fine: '₹50' },
      // Add more mock or fetched data
    ]);
  }, []);

  return (
    <div>
      <h3>Overdue Returns</h3>
      <table>
        <thead>
          <tr>
            <th>Serial No</th><th>Name</th><th>Member ID</th><th>Issue Date</th><th>Return Date</th><th>Fine</th>
          </tr>
        </thead>
        <tbody>
          {overdues.map((o, idx) => (
            <tr key={idx}>
              <td>{o.serialNo}</td><td>{o.name}</td><td>{o.memberId}</td><td>{o.issueDate}</td><td>{o.returnDate}</td><td>{o.fine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverdueReturns;