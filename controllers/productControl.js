const mongoose = require('mongoose');
const Product = require('../models/productSchema');

exports.product_get_all = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        await Product.find().select('product owner _id productDescription productImage').then(docs => {
            console.log("Products retrieved");
            res.send(docs);
            resolve({
                statusCode: 200,
                payload: {
                    msg: "All products retrieved"
                }
            })
        })
    }).catch((err) => {
        console.log("Error in retrieving products");
        reject({
            statusCode: 400,
            payload: {
                msg: "Could not retrieve products",
                err: err
            }
        })
    })
}

exports.product_post_one = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            product: req.body.product,
            owner: req.body.owner,
            productDescription: req.body.productDescription,
            productImage: req.file.path
        })
        await product.save().then(doc => {
            console.log("Document saved");
            res.send(doc);
            resolve({
                statusCode: 200,
                payload: {
                    msg: "Document saved"
                }
            })
        }).catch(err => {
            console.log(err);
            reject({
                statusCode: 400,
                payload: {
                    msg: "Document could not be saved",
                    err: err
                }
            })
        })
    })
}

exports.product_get_one = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        const id = req.params.productId;
        await Product.findById(id).select('product owner _id productDescription productImage').then(doc => {
            console.log("From database", doc);
            res.send(doc);
            resolve({
                statusCode: 200,
                payload: {
                    msg: "Document found"
                }
            })

        }).catch(err => {
            console.log(err)
            reject({
                statusCode: 400,
                payload: {
                    msg: "Document not found",
                    err: err
                }
            })
        })
    })
}

exports.product_update_one = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        const id = req.params.productId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        await Product.updateOne({
            _id: id
        }, {$set: updateOps}).then(doc => {
            console.log(doc);
            res.send(doc);
            resolve({
                statusCode: 200,
                payload: {
                    msg: "Document updated"
                }
            })

        }).catch(err => {
            console.log(err);
            reject({
                statusCode: 400,
                payload: {
                    msg: "Document could not be updated",
                    err: err
                }
            })
        })
    })

}

exports.product_delete_one = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        const id = req.params.productId;
        await Product.deleteOne({_id: id}).then(doc => {
            console.log("Document deleted")
            res.send("Document deleted")
            resolve({
                statusCode: 200,
                payload: {
                    msg: "Document deleted"
                }
            })
        }).catch(err => {
            console.log(err);
            res.send(err);
            reject({
                statusCode: 400,
                payload: {
                    msg: "Document could not be deleted",
                    err: err
                }
            })
        })
    })

}
