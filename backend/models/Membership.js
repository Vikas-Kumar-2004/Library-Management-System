const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  membershipId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit contact number']
  },
  contactAddress: {
    type: String,
    required: [true, 'Contact address is required']
  },
  aadharCardNo: {
    type: String,
    required: [true, 'Aadhar card number is required'],
    unique: true,
    match: [/^[0-9]{12}$/, 'Please provide a valid 12-digit Aadhar number']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  pendingFine: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate membership ID
membershipSchema.pre('save', async function(next) {
  if (!this.membershipId) {
    const count = await mongoose.model('Membership').countDocuments();
    this.membershipId = `MEM${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Membership', membershipSchema);