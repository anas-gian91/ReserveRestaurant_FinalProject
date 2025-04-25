import React from 'react';

const MenuItem = ({ item, onDelete }) => {
  const { _id, productName, productCategory, productPrice, productQuantity, productStatus } = item;

  const handleDelete = () => {
    onDelete(_id);
  };

  const handleEdit = () => {
    localStorage.setItem(_id, JSON.stringify(item)); // Store item in localStorage for editing
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{productName}</h5>
        <p className="card-text">
          <strong>Category:</strong> {productCategory} <br />
          <strong>Price:</strong> ${productPrice} <br />
          <strong>Quantity:</strong> {productQuantity} <br />
          <strong>Status:</strong> {productStatus}
        </p>
        <button className="btn btn-info mr-2" onClick={handleEdit}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default MenuItem;
