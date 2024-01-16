const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer(); 

const app = express();
app.use(cors({})); // for use multiple localhost
app.use(upload.none()); // for getting the data into the form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const productRoutes = require('./routes/productRoutes.js');
app.use('/api/product', productRoutes);

// Connect to MongoDB database
const dbConfig = require('./config/db.js');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  }).then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
  });
  
  


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
