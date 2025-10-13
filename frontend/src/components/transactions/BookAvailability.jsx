import React from 'react';

const BookAvailability = ({ results, onSelect }) => (
  <div>
    <h3>Search Results</h3>
    <table>
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Author</th>
          <th>Serial No</th>
          <th>Available</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        {results.map((book, idx) => (
          <tr key={idx}>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.serialNo}</td>
            <td>{book.available ? 'Yes' : 'No'}</td>
            <td>
              <input
                type="radio"
                name="selectedBook"
                value={book.serialNo}
                onChange={() => onSelect(book)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BookAvailability;