const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    productImage: { type: String, required: true },

    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductsSchema = mongoose.model("ProductsSchema ", productsSchema);

module.exports = ProductsSchema;
