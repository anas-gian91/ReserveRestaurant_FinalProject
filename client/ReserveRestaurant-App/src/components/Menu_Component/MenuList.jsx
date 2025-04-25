import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems, onDelete }) => {
  return (
    <div className="row">
      {menuItems.map((item) => (
        <div className="col-md-4 mb-4" key={item._id}>
          <MenuItem item={item} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default MenuList;
