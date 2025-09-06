const mongoose = require("mongoose");

const roleSChema = mongoose.Schema({
    title: String,
    description: String,
    permission: {
        type:Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deleteAt: Date,
}
    , {
        Timestamp: true,
    })

const Role = mongoose.model("Role",roleSChema,"roles");
module.exports = Role;