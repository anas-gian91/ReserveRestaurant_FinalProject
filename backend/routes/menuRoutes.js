const express = require('express');
const { productCreate, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/menuController');
const router = express.Router();

router.post('/menu', productCreate);
router.get('/menu', getAllProducts);
router.get('/menu/:id', getProductById);
router.put('/menu/:id', updateProduct);
router.delete('/menu/:id', deleteProduct);

module.exports = router;