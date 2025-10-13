import React from 'react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';

const AdminHome = () => (
  <div>
    <Navbar role="admin" />
    <Sidebar role="admin" />
    <h2>Welcome Admin</h2>
  </div>
);

export default AdminHome;