const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    image: String,
    new_Price: Number,
    old_price: Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


