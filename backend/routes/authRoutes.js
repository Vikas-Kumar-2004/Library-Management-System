// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;

// ============================================

// routes/maintenanceRoutes.js
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

// ============================================

// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const {
  checkAvailability,
  issueBook,
  getTransactionForReturn,
  returnBook,
  payFine
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');

// All transaction routes require authentication
router.use(protect);

router.post('/check-availability', checkAvailability);
router.post('/issue', issueBook);
router.post('/get-for-return', getTransactionForReturn);
router.post('/return', returnBook);
router.post('/pay-fine', payFine);

module.exports = router;

// ============================================

// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const {
  getMasterListBooks,
  getMasterListMovies,
  getMasterListMemberships,
  getActiveIssues,
  getOverdueReturns,
  getIssueRequests,
  getProductDetails
} = require('../controllers/reportController');
const { protect } = require('../middleware/auth');

// All report routes require authentication
router.use(protect);

router.get('/books', getMasterListBooks);
router.get('/movies', getMasterListMovies);
router.get('/memberships', getMasterListMemberships);
router.get('/active-issues', getActiveIssues);
router.get('/overdue-returns', getOverdueReturns);
router.get('/issue-requests', getIssueRequests);
router.get('/product-details', getProductDetails);

module.exports = router;