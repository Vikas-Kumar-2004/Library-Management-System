import React, { useEffect, useState } from 'react';

const IssueRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch issue requests from API
    setRequests([
      { memberId: 'M003', name: 'The Alchemist', requestDate: '2025-10-10', fulfilledDate: '2025-10-12' },
      // Add more mock or fetched data
    ]);
  }, []);

  return (
    <div>
      <h3>Issue Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Member ID</th><th>Book/Movie</th><th>Request Date</th><th>Fulfilled Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r, idx) => (
            <tr key={idx}>
              <td>{r.memberId}</td><td>{r.name}</td><td>{r.requestDate}</td><td>{r.fulfilledDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueRequests;