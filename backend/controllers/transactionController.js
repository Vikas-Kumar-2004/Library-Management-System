const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Membership = require('../models/Membership');

// @desc    Check book availability
// @route   POST /api/transactions/check-availability
// @access  Private
exports.checkAvailability = async (req, res) => {
  try {
    const { bookName, authorName } = req.body;

    if (!bookName && !authorName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either book name or author name'
      });
    }

    let query = { status: 'Available' };

    if (bookName && authorName) {
      query.name = { $regex: bookName, $options: 'i' };
      query.authorName = { $regex: authorName, $options: 'i' };
    } else if (bookName) {
      query.name = { $regex: bookName, $options: 'i' };
    } else if (authorName) {
      query.authorName = { $regex: authorName, $options: 'i' };
    }

    const availableBooks = await Book.find(query);

    res.status(200).json({
      success: true,
      count: availableBooks.length,
      data: availableBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Issue book
// @route   POST /api/transactions/issue
// @access  Private
exports.issueBook = async (req, res) => {
  try {
    const { bookSerialNo, membershipId, issueDate, returnDate, remarks } = req.body;

    // Validate required fields
    if (!bookSerialNo || !membershipId || !issueDate) {
      return res.status(400).json({
        success: false,
        message: 'Book serial number, membership ID, and issue date are required'
      });
    }

    // Check if book exists and is available
    const book = await Book.findOne({ serialNo: bookSerialNo });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.status !== 'Available') {
      return res.status(400).json({
        success: false,
        message: 'Book is not available for issue'
      });
    }

    // Check if membership exists and is active
    const membership = await Membership.findOne({ membershipId });
    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership not found'
      });
    }

    if (membership.status !== 'Active') {
      return res.status(400).json({
        success: false,
        message: 'Membership is not active'
      });
    }

    // Validate issue date (cannot be less than today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const issueDateObj = new Date(issueDate);
    issueDateObj.setHours(0, 0, 0, 0);

    if (issueDateObj < today) {
      return res.status(400).json({
        success: false,
        message: 'Issue date cannot be earlier than today'
      });
    }

    // Calculate return date (default 15 days)
    let expectedReturnDate;
    if (returnDate) {
      expectedReturnDate = new Date(returnDate);
      const maxReturnDate = new Date(issueDateObj);
      maxReturnDate.setDate(maxReturnDate.getDate() + 15);

      if (expectedReturnDate > maxReturnDate) {
        return res.status(400).json({
          success: false,
          message: 'Return date cannot be more than 15 days from issue date'
        });
      }
    } else {
      expectedReturnDate = new Date(issueDateObj);
      expectedReturnDate.setDate(expectedReturnDate.getDate() + 15);
    }

    // Create transaction
    const transaction = await Transaction.create({
      bookSerialNo: book.serialNo,
      bookName: book.name,
      authorName: book.authorName,
      membershipId,
      issueDate: issueDateObj,
      expectedReturnDate,
      remarks: remarks || '',
      issuedBy: req.user._id
    });

    // Update book status
    book.status = 'Issued';
    await book.save();

    res.status(201).json({
      success: true,
      message: 'Book issued successfully',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get active transaction for return
// @route   POST /api/transactions/get-for-return
// @access  Private
exports.getTransactionForReturn = async (req, res) => {
  try {
    const { bookName, authorName, serialNo } = req.body;

    if (!serialNo) {
      return res.status(400).json({
        success: false,
        message: 'Serial number is required'
      });
    }

    const transaction = await Transaction.findOne({
      bookSerialNo: serialNo,
      status: { $in: ['Active', 'Overdue'] }
    }).populate('membershipId');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'No active transaction found for this book'
      });
    }

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Return book
// @route   POST /api/transactions/return
// @access  Private
exports.returnBook = async (req, res) => {
  try {
    const { transactionId, actualReturnDate } = req.body;

    if (!transactionId || !actualReturnDate) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID and actual return date are required'
      });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    if (transaction.status === 'Returned') {
      return res.status(400).json({
        success: false,
        message: 'Book already returned'
      });
    }

    // Update transaction
    transaction.actualReturnDate = new Date(actualReturnDate);
    transaction.returnedBy = req.user._id;
    const fineCalculated = transaction.calculateFine();
    transaction.fineCalculated = fineCalculated;
    
    await transaction.save();

    // Update book status
    const book = await Book.findOne({ serialNo: transaction.bookSerialNo });
    if (book) {
      book.status = 'Available';
      await book.save();
    }

    res.status(200).json({
      success: true,
      message: 'Book returned successfully',
      data: transaction,
      fine: fineCalculated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Pay fine
// @route   POST /api/transactions/pay-fine
// @access  Private
exports.payFine = async (req, res) => {
  try {
    const { transactionId, finePaid, remarks } = req.body;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID is required'
      });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // If there's a fine and it's not paid, require payment
    if (transaction.fineCalculated > 0 && !finePaid) {
      return res.status(400).json({
        success: false,
        message: 'Please pay the fine before completing the transaction'
      });
    }

    transaction.finePaid = finePaid || false;
    if (remarks) transaction.remarks = remarks;
    
    await transaction.save();

    // Update membership pending fine
    const membership = await Membership.findOne({ membershipId: transaction.membershipId });
    if (membership && finePaid) {
      membership.pendingFine = Math.max(0, membership.pendingFine - transaction.fineCalculated);
      await membership.save();
    } else if (membership && !finePaid && transaction.fineCalculated > 0) {
      membership.pendingFine += transaction.fineCalculated;
      await membership.save();
    }

    res.status(200).json({
      success: true,
      message: 'Transaction completed successfully',
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};