const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const Product = require("../models/ProductSchema");
//importing the ProductSchema model
const ProductSchemaModel = mongoose.model("ProductSchema");
//importing response standardizing librarary
const response = require("./../response_format_library/response_format");
//importing time standardizing library
const time = require("./../response_format_library/time_format_library");
//importing check_emptyString_library
const check = require("./../response_format_library/check_emptyString_library.js");
// importing logger_library
const logger = require('./../response_format_library/logger_library.js');


let getAllProducts = (req, res) => {
    ProductSchemaModel.find()
        .select("-__v -_id")
        .lean()
        .exec((err, result) => {
            //.exec executes the find query and the callback function handles the result returned by executing query
            if (err) {
                logger.error(err.message, "ProductSchema:getAllProduct", 10);
                let apiResponse = response.generate(
                    true,
                    "Failed to find the product details",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                console.log("No Product Found");
                let apiResponse = response.generate(true, "No Product found", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "All Product details found",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        });
}; // getAllProducts() ends

let viewProductById = (req, res) => {
    ProductSchemaModel.findOne({
            productId: req.params.productId
        },
        (err, result) => {
            //.exec executes the find query and the callback function handles the result returned by executing query
            if (err) {
                console.log(err);
                let apiResponse = response.generate(
                    true,
                    "Server side Error Occured",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                console.log("No Product Found");
                let apiResponse = response.generate(
                    true,
                    "No product found with such blod_id",
                    404,
                    null
                );
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "Product details found",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        }
    );
}; // viewProductById() ends

let deleteProduct = (req, res) => {
  
    if (check.isEmpty(req.params.productId)) {
        console.log('productId is missing')
        let apiResponse = response.generate(true, 'productId is missing', 404, null)
        res.send(apiResponse)
    }
    else{
    ProductSchemaModel.remove({
            'productId' : req.params.productId
        },
        (err, result) => {
            if (err) {
                console.log(err);
                let apiResponse = response.generate(
                    true,
                    "Server side Error Occured",
                    500,
                    null
                );
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                console.log("No Product Found");
                let apiResponse = response.generate(true, "No product found", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(
                    false,
                    "Product Deleted Successfully",
                    200,
                    result
                );
                res.send(apiResponse);
            }
        }
    );
}; 
}// deleteProduct ends

let editProduct = (req, res) => {
    // I don't know what's wrong with this findOne() method but I am not able to receive the updated data.

    // let options = req.body;
    //     ProductSchemaModel.findOne(
    //       { 'productId': req.params.productId }, options, (err, result) => {
    //         if (err) {
    //           console.log("some error occured " + err);
    //           res.send(err);
    //         } else if (
    //             check.isEmpty(result);
    //         ) {
    //           console.log("No Product Found");
    //           res.send("No Product found");
    //         } else {
    //             result.save(options, (err, result) => {
    //               if (err) {
    //                 res.send(err);
    //               } else {
    //                 res.send(result);
    //               }
    //             });
    //           }
    //         }
    //     )

    // Another approach using Update method
    let options = req.body;
    console.log.options;
    ProductSchemaModel.update({
            productId: req.params.productId
        },
        options, {
            multi: true
        }
    ).exec((err, result) => {
        if (err) {
            console.log(err);
            let apiResponse = response.generate(
                true,
                "Server side Error Occured",
                500,
                null
            );
            res.send(apiResponse);
        } else if (check.isEmpty(result)) {
            console.log("No Product Found");
            let apiResponse = response.generate(true, "No product found", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(
                false,
                "Product Edited Successfully",
                200,
                result
            );
            res.send(result);
        }
    });
}; // editProduct ends


let createProduct = (req, res) => {
    let productId = shortid.generate();

    let newProduct = new ProductSchemaModel({
        productId: productId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        freeDelivery: req.body.freeDelivery,
        imageLink: req.body.imageLink,
        views: req.body.views,
        inStock: req.body.inStock,
        productAdded: time.now(),
        lastModified: time.now()
    });

    let availableSizes =
        req.body.availableSizes != undefined &&
        req.body.availableSizes != null &&
        req.body.availableSizes != "" ?
        req.body.availableSizes.split(",") :
        [];
    newProduct.availableSizes = req.body.availableSizes;

    let tags =
        req.body.tags != undefined && req.body.tags != null && req.body.tags != "" ?
        req.body.tags.split(",") :
        [];
    newProduct.tags = req.body.tags;

    //mongoose function to store the result in MongoDB
    newProduct.save((err, result) => {
        if (err) {
            console.log(err);
            let apiResponse = response.generate(
                true,
                "Server side Error Occured",
                500,
                null
            );
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(
                false,
                "Product Created Successfully",
                200,
                result
            );
            res.send(apiResponse);
        }
    }); // end newBproduct.save
};

module.exports = {
    getAllProducts: getAllProducts,
    viewProductById: viewProductById,
    deleteProduct: deleteProduct,
    editProduct: editProduct,
    createProduct: createProduct
};