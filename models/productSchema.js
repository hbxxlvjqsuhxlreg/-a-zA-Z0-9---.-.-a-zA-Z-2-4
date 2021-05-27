const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
