import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => (
  <nav>
    <Link to={`/${role}-home`}>Home</Link>
    <Link to="/reports">Reports</Link>
    <Link to="/transactions">Transactions</Link>
    {role === 'admin' && <Link to="/maintenance">Maintenance</Link>}
    <Link to="/logout">Logout</Link>
  </nav>
);

export default Navbar;