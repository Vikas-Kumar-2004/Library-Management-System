import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/logout-success');
  };

  const homeLink = isAdmin ? '/admin/home' : '/user/home';

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to={homeLink} className="nav-link">Home</Link>
        {isAdmin && (
          <Link to="/maintenance" className="nav-link">Maintenance</Link>
        )}
        <Link to="/reports" className="nav-link">Reports</Link>
        <Link to="/transactions" className="nav-link">Transactions</Link>
      </div>
      <div className="nav-right">
        <span className="user-info">Welcome, {user?.name}</span>
        <button onClick={handleLogout} className="btn btn-logout">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;