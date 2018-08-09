const express = require("express");
const controller = require('../controllers/controllers');
const appConfig = require("../config/appConfig");

let setRouter = (app) => {
    //setting up the base URL
    let baseUrl = appConfig.apiVersion + "/products";

    app.get(baseUrl + "/all", controller.getAllProducts);

/**
 * @api {get} /api/v1/products/all Get all products
 * @apiVersion 0.0.1
 * @apiGroup Read
 *
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "error": false,
    "message": "All Products Details Found",
    "status": 200,
    "data": [
                {
                   productId:"string",
                   name: "string",
                   description: "string"
                   price: number,
                   category:"string",
                   freeDelivery:"boolean",
                   imageLink:"string",
                   views: "number",
                   availableSizes: object(type = array),
                   tags: object(type = array),
                   inStock: "boolean",
                   productAdded: today,
                   lastModified: today
                }
            ]
      }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Failed To find product details",
    "status": 500,
    "data": null
   }
 */

    app.get(baseUrl + "/view/:productId", controller.viewProductById);

/**
 * @api {get} /api/v1/products/view/:productId Get a single product
 * @apiVersion 0.0.1
 * @apiGroup read
 *
 * @apiParam {String} productId The productId should be passed as the URL parameter
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "error": false,
    "message": "Products Found Successfully.",
    "status": 200,
    "data": {
                productId:"string",
                name: "string",
                description: "string"
                price: number,
                category:"string",
                freeDelivery:"boolean",
                imageLink:"string",
                views: "number",
                availableSizes: object(type = array),
                tags: object(type = array),
                inStock: "boolean",
                productAdded: today,
                lastModified: today
            }
        }
    }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 500,
    "data": null
   }
 */

    app.post(baseUrl + "/:productId/delete", controller.deleteProduct);

/**
 * @api {post} /api/v1/products/:productId/delete Delete product by productId
 * @apiVersion 0.0.1
 * @apiGroup delete
 *
 * @apiParam {String} productId productId of the product passed as the URL parameter
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "error": false,
    "message": "Product Deleted Successfully",
    "status": 200,
    "data": []
      }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 500,
    "data": null
   }
 */

    app.put(baseUrl + "/:productId/edit", controller.editProduct);

 /**
 * @api {put} /api/v1/:productId/edit Edit product by productId
 * @apiVersion 0.0.1
 * @apiGroup edit
 *
 * @apiParam {String} productId productId of the product passed as the URL parameter
 *
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "error": false,
    "message": "Product Edited Successfully.",
    "status": 200,
    "data": [
                {
                    productId:"string",
                    name: "string",
                    description: "string"
                    price: number,
                    category:"string",
                    freeDelivery:"boolean",
                    imageLink:"string",
                    views: "number",
                    availableSizes: object(type = array),
                    tags: object(type = array),
                    inStock: "boolean",
                    productAdded: today,
                    lastModified: today
                 }
            ]
      }
  }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 500,
    "data": null
   }
 */

    app.post(baseUrl + "/create", controller.createProduct);

/**
 * @api {post} /api/v1/products/Create Create product
 * @apiVersion 0.0.1
 * @apiGroup create
 *
 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
 * @apiParam {String} name  name of the product passed as a body parameter
 * @apiParam {String} description  description of the product passed as a body parameter
 * @apiParam {Number} price price of the product passed as a body parameter
 * @apiParam {String} category category of the product passed as a body parameter
 * @apiParam {Boolean} freeDelivery freeDelivery of the product passed as a body parameter
 * @apiParam {Number} views views of the product passed as a body parameter
 * @apiParam {Array} availableSizes availableSizes of the product passed as a body parameter
 * @apiParam {Array} tags tags of the product passed as a body parameter
 * @apiParam {Boolean} inStock inStock of the product passed as a body parameter
 * 
   
 
 *  @apiSuccessExample {json} Success-Response:
 *  {
    "error": false,
    "message": "Product Created successfully",
    "status": 200,
    "data": [
                {
                    productId:"string",
                    name: "string",
                    description: "string"
                    price: number,
                    category:"string",
                    freeDelivery:"boolean",
                    imageLink:"string",
                    views: "number",
                    availableSizes: object(type = array),
                    tags: object(type = array),
                    inStock: "boolean",
                    productAdded: today,
                    lastModified: today
                }
            ]
        }
    }
}
  @apiErrorExample {json} Error-Response:
 *
 * {
    "error": true,
    "message": "Error Occured",
    "status": 500,
    "data": null
   }
 */
}

module.exports = {
    setRouter : setRouter
}