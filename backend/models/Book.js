const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  serialNo: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Book/Movie name is required'],
    trim: true
  },
  authorName: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Science', 'Economics', 'Fiction', 'Children', 'Personal Development']
  },
  type: {
    type: String,
    required: true,
    enum: ['Book', 'Movie'],
    default: 'Book'
  },
  status: {
    type: String,
    enum: ['Available', 'Issued'],
    default: 'Available'
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required']
  },
  procurementDate: {
    type: Date,
    required: [true, 'Procurement date is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate serial number based on category and type
bookSchema.statics.generateSerialNo = async function(category, type) {
  const categoryCode = {
    'Science': 'SC',
    'Economics': 'EC',
    'Fiction': 'FC',
    'Children': 'CH',
    'Personal Development': 'PD'
  };

  const typeCode = type === 'Book' ? 'B' : 'M';
  const prefix = `${categoryCode[category]}(${typeCode})`;
  
  // Find the highest serial number for this category and type
  const lastBook = await this.findOne({ 
    serialNo: new RegExp(`^${prefix}`) 
  }).sort({ serialNo: -1 });

  let nextNumber = 1;
  if (lastBook) {
    const lastNumber = parseInt(lastBook.serialNo.split(')')[1]);
    nextNumber = lastNumber + 1;
  }

  return `${prefix}${String(nextNumber).padStart(6, '0')}`;
};

module.exports = mongoose.model('Book', bookSchema);