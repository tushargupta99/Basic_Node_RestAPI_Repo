const mongoose = require("mongoose");

//import the schema

const Schema = mongoose.Schema;

let cartSchema = new Schema({
  productId: {
    type: String
  }
});

mongoose.model("CartSchema", cartSchema);
