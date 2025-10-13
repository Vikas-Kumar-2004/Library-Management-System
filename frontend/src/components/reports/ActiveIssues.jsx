import React, { useEffect, useState } from 'react';

const ActiveIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Fetch active issues from API
    setIssues([
      { serialNo: 'SC(B)000001', name: 'Physics Basics', memberId: 'M001', issueDate: '2025-10-01', returnDate: '2025-10-16' },
      // Add more mock or fetched data
    ]);
  }, []);

  return (
    <div>
      <h3>Active Issues</h3>
      <table>
        <thead>
          <tr>
            <th>Serial No</th><th>Name</th><th>Member ID</th><th>Issue Date</th><th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((i, idx) => (
            <tr key={idx}>
              <td>{i.serialNo}</td><td>{i.name}</td><td>{i.memberId}</td><td>{i.issueDate}</td><td>{i.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveIssues;