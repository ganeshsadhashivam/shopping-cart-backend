const { Router } = require("express");

const Products = require("../models/products.modal");

const productsRouter = Router();

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
  const { name, description, productImage, date } = req.body;
  if (!name || !description || !productImage || !date) {
    return res
      .status(400)
      .json({ message: "name,description,productImage and date is required" });
  } else {
    const newProducts = new Products({
      name,
      description,
      productImage,
      date,
    });
    newProducts
      .save()
      .then(() => res.json("Products added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

//GET using ID

productsRouter.get("/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json({ message: "Products Not Found" }));
});

//POST update

productsRouter.post("/update/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((products) => {
      products.name = req.body.name;
      products.description = req.body.description;
      products.productImage = req.body.productImage;
      products.date = req.body.date;

      products
        .save()
        .then(() => res.json("Products updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json({ message: "Product Not Found" }));
});

//DELETE
productsRouter.delete("/:id", (req, res) => {
  Products.findByIdAndDelete(req.params.id)
    .then(() => res.json("Products deleted."))
    .catch((err) => res.status(400).json({ message: "Product Not Found" }));
});

module.exports = productsRouter;
