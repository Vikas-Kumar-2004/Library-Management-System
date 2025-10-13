import React from 'react';

const ProductDetails = ({ items }) => (
  <table>
    <thead>
      <tr>
        <th>Serial No</th>
        <th>Name</th>
        <th>Author</th>
        <th>Category</th>
        <th>Status</th>
        <th>Cost</th>
        <th>Procurement Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, idx) => (
        <tr key={idx}>
          <td>{item.serialNo}</td>
          <td>{item.name}</td>
          <td>{item.author}</td>
          <td>{item.category}</td>
          <td>{item.status}</td>
          <td>{item.cost}</td>
          <td>{item.procurementDate}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductDetails;