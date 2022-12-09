const router = require("express").Router();
const Products = require("../models/products.modal");

const multer = require("multer");
//const upload = multer({ dest: "./uploads/" });

//const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/pmg")
    cb(null, false);
  cb(null, true);
};

const upload = multer({ storage: storage });

//GET Request
router.route("/").get((req, res) => {
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

router.route("/name/:name").get((req, res) => {
  console.log(req.params.name);
  // Products.find({ name: req.params.name })
  Products.find({ name: { $regex: "apple", $options: "i" } })
    .then((products) => {
      if (products) {
        res.status(200).json({
          products: products,
          req: {
            type: "GET",
            url: "http://localhost:5000/api/v1/categories/",
          },
        });
      }
    })

    .catch((err) => res.status(400).json("Error: " + err));
});

// const upload = multer({ storage: storage });
//post request
//categories/add
router.post("/add", upload.single("productImage"), (req, res) => {
  console.log(req.file);
  const name = req.body.name;
  const description = req.body.description;
  const productImage = req.body.productImage;
  const date = Date.parse(req.body.date);

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
});

router.route("/:id").get((req, res) => {
  Products.findById(req.params.id)
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Products.findByIdAndDelete(req.params.id)
    .then(() => res.json("Products deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Products.findById(req.params.id)
    .then((products) => {
      products.name = req.body.name;
      products.description = req.body.description;
      products.productImage = req.body.productImage;
      products.date = Date.parse(req.body.date);

      products
        .save()
        .then(() => res.json("Products updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
