const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema({
    title: String,
    parent_category_id:String,
    description: {
        type:String,
        default:""
    },
    category: String,
    price: Number,
    stock: Number,
    brand: String,
    images: [String],
    thumbnail: String,
    discountPercentage: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    status: String,
    deleteAt: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", ProductSchema, "products");
module.exports = Product;