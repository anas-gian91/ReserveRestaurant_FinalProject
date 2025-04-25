import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuForm from './MenuForm';
import MenuList from './MenuList';

const Menu = () => {
  const API_URL = 'http://localhost:8020/viewmenu/menu';
  
  const [menuItems, setMenuItems] = useState([]);

  // Fetch menu items from the backend
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Handle creating a new menu item
  const createMenuItem = async (menuItem) => {
    try {
      await axios.post(API_URL, menuItem);
      fetchMenuItems(); // Refresh the list
    } catch (error) {
      console.error('Error creating menu item:', error);
    }
  };

  // Handle updating an existing menu item
  const updateMenuItem = async (id, updatedMenuItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedMenuItem);
      fetchMenuItems(); // Refresh the list
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  // Handle deleting a menu item
  const deleteMenuItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMenuItems(); // Refresh the list
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Menu Management</h1>
      <MenuForm onCreate={createMenuItem} onUpdate={updateMenuItem} />
      <MenuList menuItems={menuItems} onDelete={deleteMenuItem} />
    </div>
  );
};

export default Menu;
