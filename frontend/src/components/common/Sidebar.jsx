import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => (
  <aside>
    <ul>
      {role === 'admin' && (
        <>
          <li><Link to="/maintenance/add-membership">Add Membership</Link></li>
          <li><Link to="/maintenance/update-membership">Update Membership</Link></li>
          <li><Link to="/maintenance/add-book">Add Book</Link></li>
          <li><Link to="/maintenance/update-book">Update Book</Link></li>
          <li><Link to="/maintenance/user-management">User Management</Link></li>
        </>
      )}
      <li><Link to="/transactions/book-available">Book Available</Link></li>
      <li><Link to="/transactions/issue-book">Issue Book</Link></li>
      <li><Link to="/transactions/return-book">Return Book</Link></li>
      <li><Link to="/transactions/pay-fine">Pay Fine</Link></li>
    </ul>
  </aside>
);

export default Sidebar;