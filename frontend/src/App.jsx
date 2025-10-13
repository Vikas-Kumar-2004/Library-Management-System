import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Common
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

// Pages
import AdminHome from './components/pages/AdminHome';
import UserHome from './components/pages/UserHome';
import TransactionSuccess from './components/pages/TransactionSuccess';
import TransactionCancelled from './components/pages/TransactionCancelled';

// Maintenance
import AddMembership from './components/maintenance/AddMembership';
import UpdateMembership from './components/maintenance/UpdateMembership';
import AddBook from './components/maintenance/AddBook';
import UpdateBook from './components/maintenance/UpdateBook';
import UserManagement from './components/maintenance/UserManagement';

// Transactions
import BookAvailable from './components/transactions/BookAvailable';
import BookAvailability from './components/transactions/BookAvailability';
import IssueBook from './components/transactions/IssueBook';
import ReturnBook from './components/transactions/ReturnBook';
import PayFine from './components/transactions/PayFine';

// Reports
import MasterListBooks from './components/reports/MasterListBooks';
import MasterListMovies from './components/reports/MasterListMovies';
import MasterListMemberships from './components/reports/MasterListMemberships';
import ActiveIssues from './components/reports/ActiveIssues';
import OverdueReturns from './components/reports/OverdueReturns';
import IssueRequests from './components/reports/IssueRequests';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* Home Pages */}
      <Route path="/admin-home" element={<ProtectedRoute role="admin"><AdminHome /></ProtectedRoute>} />
      <Route path="/user-home" element={<ProtectedRoute role="user"><UserHome /></ProtectedRoute>} />

      {/* Maintenance (Admin Only) */}
      <Route path="/maintenance/add-membership" element={<ProtectedRoute role="admin"><AddMembership /></ProtectedRoute>} />
      <Route path="/maintenance/update-membership" element={<ProtectedRoute role="admin"><UpdateMembership /></ProtectedRoute>} />
      <Route path="/maintenance/add-book" element={<ProtectedRoute role="admin"><AddBook /></ProtectedRoute>} />
      <Route path="/maintenance/update-book" element={<ProtectedRoute role="admin"><UpdateBook /></ProtectedRoute>} />
      <Route path="/maintenance/user-management" element={<ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>} />

      {/* Transactions (Admin & User) */}
      <Route path="/transactions/book-available" element={<ProtectedRoute><BookAvailable /></ProtectedRoute>} />
      <Route path="/transactions/book-availability" element={<ProtectedRoute><BookAvailability /></ProtectedRoute>} />
      <Route path="/transactions/issue-book" element={<ProtectedRoute><IssueBook /></ProtectedRoute>} />
      <Route path="/transactions/return-book" element={<ProtectedRoute><ReturnBook /></ProtectedRoute>} />
      <Route path="/transactions/pay-fine" element={<ProtectedRoute><PayFine /></ProtectedRoute>} />

      {/* Reports (Admin & User) */}
      <Route path="/reports/books" element={<ProtectedRoute><MasterListBooks /></ProtectedRoute>} />
      <Route path="/reports/movies" element={<ProtectedRoute><MasterListMovies /></ProtectedRoute>} />
      <Route path="/reports/memberships" element={<ProtectedRoute><MasterListMemberships /></ProtectedRoute>} />
      <Route path="/reports/active-issues" element={<ProtectedRoute><ActiveIssues /></ProtectedRoute>} />
      <Route path="/reports/overdue-returns" element={<ProtectedRoute><OverdueReturns /></ProtectedRoute>} />
      <Route path="/reports/issue-requests" element={<ProtectedRoute><IssueRequests /></ProtectedRoute>} />

      {/* Transaction Status */}
      <Route path="/transaction-success" element={<TransactionSuccess />} />
      <Route path="/transaction-cancelled" element={<TransactionCancelled />} />

      {/* Default Route */}
      <Route path="*" element={<Navigate to={user ? `/${user.role}-home` : '/login'} />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;