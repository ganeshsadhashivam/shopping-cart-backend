const { Router } = require("express");

const Products = require("../models/products.modal");

const productsRouter = Router();
const mongoose = require("mongoose");

// GET Request
productsRouter.route("/").get((req, res) => {
  Products.find()
    .then((products) => {
      if (products) {
        res.status(200).json({
          products: products,
          request: {
            type: "GET",
            url: "http://localhost:5000/api/v1/products/",
          },
        });
      }
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

//POST Request to add
productsRouter.post("/add", (req, res) => {
  const { name, description, productImage, date, brand, cost } = req.body;
  if (!name || !description || !productImage || !date || !brand || !cost) {
    return res.status(400).json({
      message: "name,description,productImage, date,brand and cost is required",
    });
  } else {
    const newProducts = new Products({
      name,
      description,
      productImage,
      date,
      brand,
      cost,
    });
    newProducts
      .save()
      .then((products) => res.status(201).json(products))
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

//GET using ID

productsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findById(id);

    if (!product) res.status(404).json({ message: "Product does Not Found" });
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(404).json({ message: "Invalid ProductId" });
    }
  }
});

//PUT UPDATE

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Products.findByIdAndUpdate(id, updates).then(
      (products) => res.status(200).json(products)
    );
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(404).json({ message: "Invalid ProductId" });
    }
  }
});

//DELETE PRODUCT BY ID
productsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Products.findByIdAndDelete(id);
    console.log(product);
    if (!product) res.status(404).json({ message: "Product does Not Found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(404).json({ message: "Invalid ProductId" });
    }
  }
});

module.exports = productsRouter;
