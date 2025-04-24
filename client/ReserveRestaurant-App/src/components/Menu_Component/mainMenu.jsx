import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('http://localhost:8020/viewmenu/menu'); // Make sure the backend is running
      setMenuItems(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Our Menu</h1>

      {loading && <div className="text-center">Loading menu...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {menuItems.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.category}</h6>
                <p className="card-text">
                  {item.description || 'No description available.'}
                </p>
              </div>
              <div className="card-footer">
                <strong>${item.price}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && !menuItems.length && (
        <p className="text-center">No menu items found.</p>
      )}
    </div>
  );
};

export default Menu;