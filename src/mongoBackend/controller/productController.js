const Product = require('../models/Products.js');



exports.addProduct = async  (req, res) => {
   
    try {
        const { name, category, new_Price, old_price } = req.body;
        const image = req.file; // This will contain the image file data
        
        // Use the extracted data to create a new product
        const newProduct = new Product({
            name,
            category,
            image: image ? image.buffer : undefined,
            new_Price,
            old_price
        });
    
        newProduct.save()
            .then(() => {
                res.status(201).json({ message: 'Product added successfully' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ error: "Failed to add product" });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add product" });
    }
};



exports.getProducts = async (req, res) => {
    try {
        Product.find({}).then(function (products) {
            res.json(products);
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to fetch data" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed....' });
    }
};



// app.get("/new_collections/:productId", (req, res) => {
    exports.getProductsById = async (req, res) => {
      
    const productId = req.params.productId;
    Product.findById(productId)
        .then(function (product) {
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({ error: "Failed to fetddch data" });
        });
};




// app.post("/editProduct/:productId", upload, async (req, res) => {
    exports.editProduct = async (req, res) => {
    const productId = req.params.productId;
    const { name, category, new_Price, old_price } = req.body;
    const image = req.file; // This will contain the image file data

    try {
        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update product properties
        product.name = name;
        product.category = category;
        product.new_Price = new_Price;
        product.old_price = old_price;

        // Update image if a new one is uploaded
        if (image) {
            product.image = image.buffer;
        }   

        // Save the updated product
        await product.save();

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Failed to update product" });
    }
}; 



// app.delete("/deleteProduct/:productId", async (req, res) => {
    exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Failed to delete product" });
    }
};
