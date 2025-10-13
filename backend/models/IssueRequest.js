const mongoose = require('mongoose');

const issueRequestSchema = new mongoose.Schema({
  membershipId: {
    type: String,
    required: [true, 'Membership ID is required'],
    ref: 'Membership'
  },
  bookName: {
    type: String,
    required: [true, 'Book/Movie name is required']
  },
  requestedDate: {
    type: Date,
    default: Date.now
  },
  requestFulfilledDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Pending', 'Fulfilled', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('IssueRequest', issueRequestSchema);