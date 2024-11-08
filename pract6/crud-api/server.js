const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For handling CORS

// Initialize the app
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser middleware to handle JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crud_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define a simple schema and model
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});
const Item = mongoose.model('Item', ItemSchema);

// Set up routes
require('./routes')(app, Item);

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
