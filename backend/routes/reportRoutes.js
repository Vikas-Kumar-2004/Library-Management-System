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