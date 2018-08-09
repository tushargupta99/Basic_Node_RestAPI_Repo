 // name of the schema = productSchema, name of the model = ProductSchema
const mongoose = require("mongoose");
//importing time standardizing library
const time = require("./../response_format_library/time_format_library");

const Schema = mongoose.Schema;

let productSchema = new Schema({
  productId: {
    type: String,
    unique: true
  },

  name: {
    type: String,
    default: ""
  },

  description: {
    type: String,
    default: ""
  },

  price: {
    type: Number,
    default: 0
  },

  category: {
    type: String,
    default: ""
  },

  freeDelivery: {
    type: Boolean,
    default: false
  },

  imageLink: {
    type: String,
    default: ""
  },

  views: {
    type: Number,
    default: 0
  },

  availableSizes: {
    type: [],
    default: []
  },

  tags: {
    type: Array,
    default: []
  },

  inStock: {
    type: Boolean,
    default: true
  },

  productAdded: {
    type: Date,
    default: time.now()
  },

  lastModified: {
    type: Date,
    default: time.now()
  }
});

// Ok mongoose, I am attaching this schema(productSchema) and whenever ProductSchema model is called, U have to use the convention in attached schema.
//Here we are not exporting anything at the end of the ProductSchema model, because that is taken care by mongoose internally
mongoose.model('ProductSchema', productSchema); //gonna create collection named productschema in small

