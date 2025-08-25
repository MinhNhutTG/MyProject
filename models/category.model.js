const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

const categorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    status: String,
    position: Number,
    thumbnail: String,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: { type: String, slug: "title", unique: true },
    deleteAt: String
}, {
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema, "category");

module.exports = Category;