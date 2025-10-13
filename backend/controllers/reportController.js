const Book = require('../models/Book');
const Membership = require('../models/Membership');
const Transaction = require('../models/Transaction');
const IssueRequest = require('../models/IssueRequest');

// @desc    Get master list of books
// @route   GET /api/reports/books
// @access  Private
exports.getMasterListBooks = async (req, res) => {
  try {
    const books = await Book.find({ type: 'Book' }).sort({ serialNo: 1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get master list of movies
// @route   GET /api/reports/movies
// @access  Private
exports.getMasterListMovies = async (req, res) => {
  try {
    const movies = await Book.find({ type: 'Movie' }).sort({ serialNo: 1 });

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get master list of memberships
// @route   GET /api/reports/memberships
// @access  Private
exports.getMasterListMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ membershipId: 1 });

    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get active issues
// @route   GET /api/reports/active-issues
// @access  Private
exports.getActiveIssues = async (req, res) => {
  try {
    const activeIssues = await Transaction.find({
      status: { $in: ['Active', 'Overdue'] }
    }).sort({ issueDate: -1 });

    res.status(200).json({
      success: true,
      count: activeIssues.length,
      data: activeIssues
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get overdue returns
// @route   GET /api/reports/overdue-returns
// @access  Private
exports.getOverdueReturns = async (req, res) => {
  try {
    const today = new Date();
    
    // Find all active transactions where expected return date has passed
    const overdueReturns = await Transaction.find({
      status: { $in: ['Active', 'Overdue'] },
      expectedReturnDate: { $lt: today }
    }).sort({ expectedReturnDate: 1 });

    // Calculate fine for each
    const overdueWithFines = overdueReturns.map(transaction => {
      const fine = transaction.calculateFine();
      return {
        ...transaction.toObject(),
        fineCalculated: fine
      };
    });

    res.status(200).json({
      success: true,
      count: overdueWithFines.length,
      data: overdueWithFines
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get issue requests
// @route   GET /api/reports/issue-requests
// @access  Private
exports.getIssueRequests = async (req, res) => {
  try {
    const issueRequests = await IssueRequest.find()
      .populate('membershipId')
      .sort({ requestedDate: -1 });

    res.status(200).json({
      success: true,
      count: issueRequests.length,
      data: issueRequests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get product details (category-wise books/movies)
// @route   GET /api/reports/product-details
// @access  Private
exports.getProductDetails = async (req, res) => {
  try {
    const categories = ['Science', 'Economics', 'Fiction', 'Children', 'Personal Development'];
    const productDetails = [];

    for (const category of categories) {
      const books = await Book.find({ category }).sort({ serialNo: 1 });
      
      if (books.length > 0) {
        const codeNoFrom = books[0].serialNo;
        const codeNoTo = books[books.length - 1].serialNo;
        
        productDetails.push({
          category,
          codeNoFrom,
          codeNoTo,
          totalItems: books.length
        });
      }
    }

    res.status(200).json({
      success: true,
      data: productDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};