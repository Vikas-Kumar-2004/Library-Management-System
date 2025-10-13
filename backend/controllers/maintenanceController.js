const Membership = require('../models/Membership');
const Book = require('../models/Book');
const User = require('../models/User');

// ============ MEMBERSHIP MANAGEMENT ============

// @desc    Add new membership
// @route   POST /api/maintenance/membership/add
// @access  Private/Admin
exports.addMembership = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber, contactAddress, aadharCardNo, startDate, membershipDuration } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !contactNumber || !contactAddress || !aadharCardNo || !startDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if Aadhar already exists
    const existingMember = await Membership.findOne({ aadharCardNo });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'A membership with this Aadhar number already exists'
      });
    }

    // Calculate end date based on duration
    const start = new Date(startDate);
    const end = new Date(start);
    
    switch(membershipDuration) {
      case '6months':
        end.setMonth(end.getMonth() + 6);
        break;
      case '1year':
        end.setFullYear(end.getFullYear() + 1);
        break;
      case '2years':
        end.setFullYear(end.getFullYear() + 2);
        break;
      default:
        end.setMonth(end.getMonth() + 6); // Default 6 months
    }

    const membership = await Membership.create({
      firstName,
      lastName,
      contactNumber,
      contactAddress,
      aadharCardNo,
      startDate: start,
      endDate: end
    });

    res.status(201).json({
      success: true,
      message: 'Membership created successfully',
      data: membership
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update membership
// @route   PUT /api/maintenance/membership/update
// @access  Private/Admin
exports.updateMembership = async (req, res) => {
  try {
    const { membershipId, action, extensionDuration } = req.body;

    if (!membershipId) {
      return res.status(400).json({
        success: false,
        message: 'Membership ID is required'
      });
    }

    const membership = await Membership.findOne({ membershipId });

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership not found'
      });
    }

    if (action === 'extend') {
      const currentEndDate = new Date(membership.endDate);
      
      switch(extensionDuration) {
        case '6months':
          currentEndDate.setMonth(currentEndDate.getMonth() + 6);
          break;
        case '1year':
          currentEndDate.setFullYear(currentEndDate.getFullYear() + 1);
          break;
        case '2years':
          currentEndDate.setFullYear(currentEndDate.getFullYear() + 2);
          break;
        default:
          currentEndDate.setMonth(currentEndDate.getMonth() + 6);
      }
      
      membership.endDate = currentEndDate;
      membership.status = 'Active';
    } else if (action === 'cancel') {
      membership.status = 'Inactive';
    }

    await membership.save();

    res.status(200).json({
      success: true,
      message: `Membership ${action === 'extend' ? 'extended' : 'cancelled'} successfully`,
      data: membership
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get membership by ID
// @route   GET /api/maintenance/membership/:id
// @access  Private/Admin
exports.getMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({ membershipId: req.params.id });

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership not found'
      });
    }

    res.status(200).json({
      success: true,
      data: membership
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ============ BOOK/MOVIE MANAGEMENT ============

// @desc    Add new book/movie
// @route   POST /api/maintenance/book/add
// @access  Private/Admin
exports.addBook = async (req, res) => {
  try {
    const { name, authorName, category, type, cost, procurementDate, quantity } = req.body;

    if (!name || !authorName || !category || !type || !cost || !procurementDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const copies = parseInt(quantity) || 1;
    const createdBooks = [];

    for (let i = 0; i < copies; i++) {
      const serialNo = await Book.generateSerialNo(category, type);
      
      const book = await Book.create({
        serialNo,
        name,
        authorName,
        category,
        type,
        cost,
        procurementDate
      });

      createdBooks.push(book);
    }

    res.status(201).json({
      success: true,
      message: `${copies} ${type}(s) added successfully`,
      data: createdBooks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update book/movie
// @route   PUT /api/maintenance/book/update
// @access  Private/Admin
exports.updateBook = async (req, res) => {
  try {
    const { serialNo, name, authorName, status, procurementDate } = req.body;

    if (!serialNo) {
      return res.status(400).json({
        success: false,
        message: 'Serial number is required'
      });
    }

    const book = await Book.findOne({ serialNo });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book/Movie not found'
      });
    }

    if (name) book.name = name;
    if (authorName) book.authorName = authorName;
    if (status) book.status = status;
    if (procurementDate) book.procurementDate = procurementDate;

    await book.save();

    res.status(200).json({
      success: true,
      message: 'Book/Movie updated successfully',
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get book by serial number
// @route   GET /api/maintenance/book/:serialNo
// @access  Private/Admin
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findOne({ serialNo: req.params.serialNo });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book/Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// ============ USER MANAGEMENT ============

// @desc    Add or update user
// @route   POST /api/maintenance/user/manage
// @access  Private/Admin
exports.manageUser = async (req, res) => {
  try {
    const { userId, name, username, password, isAdmin, isActive, isNewUser } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    if (isNewUser) {
      // Create new user
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required for new user'
        });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already exists'
        });
      }

      const user = await User.create({
        name,
        username,
        password,
        isAdmin: isAdmin || false,
        isActive: isActive !== false
      });

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          id: user._id,
          name: user.name,
          username: user.username,
          isAdmin: user.isAdmin,
          isActive: user.isActive
        }
      });
    } else {
      // Update existing user
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: 'User ID is required for update'
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      user.name = name;
      if (password) user.password = password;
      user.isAdmin = isAdmin || false;
      user.isActive = isActive !== false;

      await user.save();

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: {
          id: user._id,
          name: user.name,
          username: user.username,
          isAdmin: user.isAdmin,
          isActive: user.isActive
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all users
// @route   GET /api/maintenance/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};