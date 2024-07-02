const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define schema and model for CartItem
const cartItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  price: String,
  brand: String,
  quantity: Number,
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

app.get('/api/cart', async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/cart/add', async (req, res) => {
  try {
    const newItem = req.body;
    const cartItem = new CartItem(newItem);
    await cartItem.save();
    res.status(201).send('Item added to cart');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to remove an item from the cart
app.delete("/api/cart/remove/:shoeId", async (req, res) => {
  const { shoeId } = req.params;

  try {
    await CartItem.deleteOne({ id: shoeId });
    res.status(200).send("Item removed from cart");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
