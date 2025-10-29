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