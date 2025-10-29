import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import axios from '../../services/api';

const BookAvailable = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    bookName: '',
    authorName: ''
  });
  const [results, setResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);
    setSelectedBook(null);

    if (!searchData.bookName && !searchData.authorName) {
      setError('Please enter either book name or author name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/transactions/check-availability', searchData);
      setResults(response.data.data);
      setSearched(true);
      if (response.data.count === 0) {
        setError('No available books/movies found');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book.serialNo);
  };

  const handleIssueBook = () => {
    if (!selectedBook) {
      setError('Please select a book to issue');
      return;
    }
    navigate('/transactions/issue', { state: { selectedBookSerialNo: selectedBook } });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Check Book Availability</h1>

        <form onSubmit={handleSearch} className="form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Enter Book Name:</label>
            <input
              type="text"
              name="bookName"
              value={searchData.bookName}
              onChange={handleChange}
              placeholder="Enter book/movie name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Enter Author:</label>
            <input
              type="text"
              name="authorName"
              value={searchData.authorName}
              onChange={handleChange}
              placeholder="Enter author name"
              disabled={loading}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Back
            </button>
          </div>
        </form>

        {searched && results.length > 0 && (
          <div className="results-section">
            <h2>Search Results</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Serial Number</th>
                  <th>Available</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {results.map((book) => (
                  <tr key={book.serialNo}>
                    <td>{book.name}</td>
                    <td>{book.authorName}</td>
                    <td>{book.serialNo}</td>
                    <td>{book.status === 'Available' ? 'Y' : 'N'}</td>
                    <td>
                      <input
                        type="radio"
                        name="selectedBook"
                        value={book.serialNo}
                        checked={selectedBook === book.serialNo}
                        onChange={() => handleSelectBook(book)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedBook && (
              <div className="button-group">
                <button 
                  className="btn btn-primary" 
                  onClick={handleIssueBook}
                >
                  Issue Selected Book
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAvailable;