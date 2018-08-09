const express = require("express");
const router = express.Router();
const cartController = require("./../controllers/cart-controllers");
const appConfig = require("./../config/appConfig");


module.exports.setRouter = function(app) {
  // setting up the base URL
  let baseUrl = appConfig.apiVersion + "/cart";

  app.get( baseUrl + "/view", cartController.viewCart );
  app.post(baseUrl + "/:productId/add", cartController.addToCart);
  app.post(baseUrl + "/:productId/remove", cartController.removeFromCart);

};
