import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../common/Navbar';
import axios from '../../services/api';

const IssueBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBookSerialNo = location.state?.selectedBookSerialNo;

  const today = new Date().toISOString().split('T')[0];
  const defaultReturnDate = new Date();
  defaultReturnDate.setDate(defaultReturnDate.getDate() + 15);

  const [formData, setFormData] = useState({
    bookSerialNo: selectedBookSerialNo || '',
    bookName: '',
    authorName: '',
    membershipId: '',
    issueDate: today,
    returnDate: defaultReturnDate.toISOString().split('T')[0],
    remarks: ''
  });
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailableBooks();
    if (selectedBookSerialNo) {
      fetchBookDetails(selectedBookSerialNo);
    }
  }, [selectedBookSerialNo]);

  const fetchAvailableBooks = async () => {
    try {
      const response = await axios.post('/transactions/check-availability', {
        bookName: '',
        authorName: ''
      });
      setBooks(response.data.data || []);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const fetchBookDetails = async (serialNo) => {
    try {
      const book = books.find(b => b.serialNo === serialNo);
      if (book) {
        setFormData(prev => ({
          ...prev,
          bookName: book.name,
          authorName: book.authorName
        }));
      }
    } catch (err) {
      console.error('Error fetching book details:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'bookSerialNo') {
      const selectedBook = books.find(b => b.serialNo === value);
      if (selectedBook) {
        setFormData(prev => ({
          ...prev,
          bookSerialNo: value,
          bookName: selectedBook.name,
          authorName: selectedBook.authorName
        }));
      }
    } else if (name === 'issueDate') {
      const newReturnDate = new Date(value);
      newReturnDate.setDate(newReturnDate.getDate() + 15);
      setFormData(prev => ({
        ...prev,
        issueDate: value,
        returnDate: newReturnDate.toISOString().split('T')[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.bookSerialNo || !formData.membershipId || !formData.issueDate) {
      setError('Book name, membership ID, and issue date are required');
      return;
    }

    // Validate issue date (cannot be less than today)
    if (formData.issueDate < today) {
      setError('Issue date cannot be earlier than today');
      return;
    }

    // Validate return date (cannot be more than 15 days from issue date)
    const issueDate = new Date(formData.issueDate);
    const returnDate = new Date(formData.returnDate);
    const maxReturnDate = new Date(issueDate);
    maxReturnDate.setDate(maxReturnDate.getDate() + 15);

    if (returnDate > maxReturnDate) {
      setError('Return date cannot be more than 15 days from issue date');
      return;
    }

    if (returnDate < issueDate) {
      setError('Return date cannot be earlier than issue date');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/transactions/issue', formData);
      navigate('/transaction-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to issue book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Issue Book</h1>

        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Enter Book Name: *</label>
            <select
              name="bookSerialNo"
              value={formData.bookSerialNo}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">-- Select Book --</option>
              {books.map((book) => (
                <option key={book.serialNo} value={book.serialNo}>
                  {book.name} ({book.serialNo})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Author Name:</label>
            <input
              type="text"
              value={formData.authorName}
              disabled
              className="disabled-input"
            />
          </div>

          <div className="form-group">
            <label>Membership ID: *</label>
            <input
              type="text"
              name="membershipId"
              value={formData.membershipId}
              onChange={handleChange}
              placeholder="Enter membership ID"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Issue Date: *</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              min={today}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Return Date: *</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              disabled={loading}
            />
            <small>Can be edited up to 15 days from issue date</small>
          </div>

          <div className="form-group">
            <label>Remarks:</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="3"
              placeholder="Optional remarks"
              disabled={loading}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Issuing...' : 'Confirm'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/transactions/check-availability')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueBook;