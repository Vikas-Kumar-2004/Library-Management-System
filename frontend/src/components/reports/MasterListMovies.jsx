import React, { useEffect, useState } from 'react';
import ProductDetails from '../common/ProductDetails';

const MasterListMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from API
    setMovies([
      { serialNo: 'FC(M)000002', name: 'Inception', author: 'Christopher Nolan', category: 'Fiction', status: 'Available', cost: '₹500', procurementDate: '2025-02-15' },
      // Add more mock or fetched data
    ]);
  }, []);

  return (
    <div>
      <h3>Master List of Movies</h3>
      <ProductDetails items={movies} />
    </div>
  );
};

export default MasterListMovies;