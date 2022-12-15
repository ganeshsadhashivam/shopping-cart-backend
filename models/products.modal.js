const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    productImage: { type: String, required: true },

    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

productsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const ProductsSchema = mongoose.model("ProductsSchema ", productsSchema);

module.exports = ProductsSchema;
