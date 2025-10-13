const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookSerialNo: {
    type: String,
    required: [true, 'Book serial number is required'],
    ref: 'Book'
  },
  bookName: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  membershipId: {
    type: String,
    required: [true, 'Membership ID is required'],
    ref: 'Membership'
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required']
  },
  expectedReturnDate: {
    type: Date,
    required: [true, 'Expected return date is required']
  },
  actualReturnDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Active', 'Returned', 'Overdue'],
    default: 'Active'
  },
  fineCalculated: {
    type: Number,
    default: 0
  },
  finePaid: {
    type: Boolean,
    default: false
  },
  remarks: {
    type: String,
    default: ''
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  returnedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate fine based on overdue days
transactionSchema.methods.calculateFine = function() {
  if (!this.actualReturnDate) {
    const today = new Date();
    const expectedReturn = new Date(this.expectedReturnDate);
    if (today > expectedReturn) {
      const daysOverdue = Math.ceil((today - expectedReturn) / (1000 * 60 * 60 * 24));
      return daysOverdue * (process.env.FINE_PER_DAY || 10);
    }
  } else {
    const actualReturn = new Date(this.actualReturnDate);
    const expectedReturn = new Date(this.expectedReturnDate);
    if (actualReturn > expectedReturn) {
      const daysOverdue = Math.ceil((actualReturn - expectedReturn) / (1000 * 60 * 60 * 24));
      return daysOverdue * (process.env.FINE_PER_DAY || 10);
    }
  }
  return 0;
};

// Update status based on dates
transactionSchema.pre('save', function(next) {
  const today = new Date();
  const expectedReturn = new Date(this.expectedReturnDate);
  
  if (this.actualReturnDate) {
    this.status = 'Returned';
  } else if (today > expectedReturn) {
    this.status = 'Overdue';
  } else {
    this.status = 'Active';
  }
  
  this.fineCalculated = this.calculateFine();
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema);