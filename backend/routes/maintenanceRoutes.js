const express = require('express');
const router = express.Router();
const {
  addMembership,
  updateMembership,
  getMembership,
  addBook,
  updateBook,
  getBook,
  manageUser,
  getAllUsers
} = require('../controllers/maintenanceController');
const { protect, adminOnly } = require('../middleware/auth');

// All maintenance routes require admin access
router.use(protect, adminOnly);

// Membership routes
router.post('/membership/add', addMembership);
router.put('/membership/update', updateMembership);
router.get('/membership/:id', getMembership);

// Book/Movie routes
router.post('/book/add', addBook);
router.put('/book/update', updateBook);
router.get('/book/:serialNo', getBook);

// User management routes
router.post('/user/manage', manageUser);
router.get('/users', getAllUsers);

module.exports = router;