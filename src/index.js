// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Add this line
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api', productRoutes);
app.use('/api/cart', cartRoutes); // Add this line

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
