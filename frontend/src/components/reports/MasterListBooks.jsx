import React, { useEffect, useState } from 'react';
import ProductDetails from '../common/ProductDetails';

const MasterListBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from API
    setBooks([
      { serialNo: 'SC(B)000001', name: 'Physics Basics', author: 'Dr. Rao', category: 'Science', status: 'Available', cost: '₹300', procurementDate: '2025-01-10' },
      // Add more mock or fetched data
    ]);
  }, []);

  return (
    <div>
      <h3>Master List of Books</h3>
      <ProductDetails items={books} />
    </div>
  );
};

export default MasterListBooks;