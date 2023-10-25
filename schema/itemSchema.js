const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        require: true
    },

    isInStock: {
        type: Boolean
    },  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }


}, {timestamps: true});

const itemsCollection = mongoose.Model(itemSchema, shopitems);



module.exports = {
    itemsCollection
};
