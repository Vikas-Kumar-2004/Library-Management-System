import React, { useEffect, useState } from 'react';
import axios from '../../services/api';

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get('/reports/product-details');
      setProductDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="product-details">
      <h3>Product Details</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Code No From</th>
            <th>Code No To</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {productDetails.map((item, index) => (
            <tr key={index}>
              <td>{item.codeNoFrom}</td>
              <td>{item.codeNoTo}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;