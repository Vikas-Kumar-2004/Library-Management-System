import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Register from "./components/pages/Register"; // ✅ add this

// Auth Components
import Login from './components/auth/Login';

// Page Components
import AdminHome from './components/pages/AdminHome';
import UserHome from './components/pages/UserHome';
import TransactionSuccess from './components/pages/TransactionSuccess';
import TransactionCancelled from './components/pages/TransactionCancelled';
import LogoutSuccess from './components/pages/LogoutSuccess';

// Maintenance Components
import AddMembership from './components/maintenance/AddMembership';
import UpdateMembership from './components/maintenance/UpdateMembership';
import AddBook from './components/maintenance/AddBook';
import UpdateBook from './components/maintenance/UpdateBook';
import UserManagement from './components/maintenance/UserManagement';

// Transaction Components
import BookAvailable from './components/transactions/BookAvailable';
import IssueBook from './components/transactions/IssueBook';
import ReturnBook from './components/transactions/ReturnBook';
import PayFine from './components/transactions/PayFine';

// Report Components
import MasterListBooks from './components/reports/MasterListBooks';
import MasterListMovies from './components/reports/MasterListMovies';
import MasterListMemberships from './components/reports/MasterListMemberships';
import ActiveIssues from './components/reports/ActiveIssues';
import OverdueReturns from './components/reports/OverdueReturns';
import IssueRequests from './components/reports/IssueRequests';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/logout-success" element={<LogoutSuccess />} />
          
          {/* Protected Routes - Admin */}
          <Route path="/admin/home" element={
            <ProtectedRoute adminOnly={true}>
              <AdminHome />
            </ProtectedRoute>
          } />

          {/* Protected Routes - User */}
          <Route path="/user/home" element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          } />

          {/* Maintenance Routes (Admin Only) */}
          <Route path="/maintenance/membership" element={
            <ProtectedRoute adminOnly={true}>
              <AddMembership />
            </ProtectedRoute>
          } />
          <Route path="/maintenance/membership/update" element={
            <ProtectedRoute adminOnly={true}>
              <UpdateMembership />
            </ProtectedRoute>
          } />
          <Route path="/maintenance/book" element={
            <ProtectedRoute adminOnly={true}>
              <AddBook />
            </ProtectedRoute>
          } />
          <Route path="/maintenance/book/update" element={
            <ProtectedRoute adminOnly={true}>
              <UpdateBook />
            </ProtectedRoute>
          } />
          <Route path="/maintenance/user" element={
            <ProtectedRoute adminOnly={true}>
              <UserManagement />
            </ProtectedRoute>
          } />

          {/* Transaction Routes */}
          <Route path="/transactions/check-availability" element={
            <ProtectedRoute>
              <BookAvailable />
            </ProtectedRoute>
          } />
          <Route path="/transactions/issue" element={
            <ProtectedRoute>
              <IssueBook />
            </ProtectedRoute>
          } />
          <Route path="/transactions/return" element={
            <ProtectedRoute>
              <ReturnBook />
            </ProtectedRoute>
          } />
          <Route path="/transactions/pay-fine" element={
            <ProtectedRoute>
              <PayFine />
            </ProtectedRoute>
          } />

          {/* Report Routes */}
          <Route path="/reports/books" element={
            <ProtectedRoute>
              <MasterListBooks />
            </ProtectedRoute>
          } />
          <Route path="/reports/movies" element={
            <ProtectedRoute>
              <MasterListMovies />
            </ProtectedRoute>
          } />
          <Route path="/reports/memberships" element={
            <ProtectedRoute>
              <MasterListMemberships />
            </ProtectedRoute>
          } />
          <Route path="/reports/active-issues" element={
            <ProtectedRoute>
              <ActiveIssues />
            </ProtectedRoute>
          } />
          <Route path="/reports/overdue-returns" element={
            <ProtectedRoute>
              <OverdueReturns />
            </ProtectedRoute>
          } />
          <Route path="/reports/issue-requests" element={
            <ProtectedRoute>
              <IssueRequests />
            </ProtectedRoute>
          } />

          {/* Success/Cancel Pages */}
          <Route path="/transaction-success" element={
            <ProtectedRoute>
              <TransactionSuccess />
            </ProtectedRoute>
          } />
          <Route path="/transaction-cancelled" element={
            <ProtectedRoute>
              <TransactionCancelled />
            </ProtectedRoute>
          } />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;