const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    brand: String,
    images: [String],
    thumbnail: String,
    deleted: Boolean,
    status: String
})

const Product = mongoose.model("Product", ProductSchema, "products");
module.exports = Product;