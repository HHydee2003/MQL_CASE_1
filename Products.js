const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  sales: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now },
  description: { type: String },
  imageUrl: { type: String, required: true }
});

const ProdModel = mongoose.model("Products", ProductSchema);

module.exports = ProdModel;