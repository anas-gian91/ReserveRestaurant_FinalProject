import React, { useState, useEffect } from 'react';

const MenuForm = ({ onCreate, onUpdate }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    productPrice: '',
    productQuantity: '',
    productStatus: 'available'
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (editingId) {
      // Fetch existing menu item data when editing
      const editingItem = JSON.parse(localStorage.getItem(editingId));
      setFormData(editingItem);
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onCreate(formData);
    }

    // Reset form
    setFormData({
      productName: '',
      productCategory: '',
      productPrice: '',
      productQuantity: '',
      productStatus: 'available'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border border-light rounded shadow-sm bg-light">
      <h2 className="text-center mb-3">{editingId ? 'Edit Menu Item' : 'Create New Menu Item'}</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          name="productName"
          id="productName"
          className="form-control"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="productCategory">Product Category</label>
        <input
          type="text"
          name="productCategory"
          id="productCategory"
          className="form-control"
          placeholder="Product Category"
          value={formData.productCategory}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="productPrice">Product Price</label>
        <input
          type="number"
          name="productPrice"
          id="productPrice"
          className="form-control"
          placeholder="Product Price"
          value={formData.productPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="productQuantity">Product Quantity</label>
        <input
          type="number"
          name="productQuantity"
          id="productQuantity"
          className="form-control"
          placeholder="Product Quantity"
          value={formData.productQuantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="productStatus">Product Status</label>
        <select
          name="productStatus"
          id="productStatus"
          className="form-control"
          value={formData.productStatus}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="out of stock">Out of Stock</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        {editingId ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  );
};

export default MenuForm;
