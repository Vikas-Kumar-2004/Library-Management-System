import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import ProductDetails from '../common/ProductDetails';

const AdminHome = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Admin Home Page</h1>
        
        <div className="menu-section">
          <div className="menu-card">
            <h2>Maintenance</h2>
            <ul className="menu-list">
              <li><Link to="/maintenance/membership">Membership Management</Link></li>
              <li><Link to="/maintenance/book">Book/Movie Management</Link></li>
              <li><Link to="/maintenance/user">User Management</Link></li>
            </ul>
          </div>

          <div className="menu-card">
            <h2>Reports</h2>
            <ul className="menu-list">
              <li><Link to="/reports/books">Master List of Books</Link></li>
              <li><Link to="/reports/movies">Master List of Movies</Link></li>
              <li><Link to="/reports/memberships">Master List of Memberships</Link></li>
              <li><Link to="/reports/active-issues">Active Issues</Link></li>
              <li><Link to="/reports/overdue-returns">Overdue Returns</Link></li>
              <li><Link to="/reports/issue-requests">Issue Requests</Link></li>
            </ul>
          </div>

          <div className="menu-card">
            <h2>Transactions</h2>
            <ul className="menu-list">
              <li><Link to="/transactions/check-availability">Check Book Availability</Link></li>
              <li><Link to="/transactions/issue">Issue Book</Link></li>
              <li><Link to="/transactions/return">Return Book</Link></li>
            </ul>
          </div>
        </div>

        <ProductDetails />
      </div>
    </div>
  );
};

export default AdminHome;