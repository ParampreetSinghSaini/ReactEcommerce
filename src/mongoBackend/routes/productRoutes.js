
const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/', productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductsById);
router.put('/:productId', productController.editProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
