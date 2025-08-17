const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: Number,
    stock: Number,
    brand: String,
    images: [String],
    thumbnail: String,
    deleted: {
        type:Boolean,
        default: false
    },
    status: String,
    deleteAt: String,
    position: Number
},{
    timestamps:true
})

const Product = mongoose.model("Product", ProductSchema, "products");
module.exports = Product;