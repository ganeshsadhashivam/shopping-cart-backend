const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

//connect to mongodb
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connect to db
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  maxPoolSize: 100,
  // waitQueueTimeoutMS: 2500,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection established successfully ");
});

//server to use our files

//require the files
const exerciseRouter = require("./routes/exercise");

const usersRouter = require("./routes/users");

const booksRouter = require("./routes/books");

const productsRouter = require("./routes/products");

//use the files

//when someone goes excercis router it will use this
app.use("/exercises", exerciseRouter);

//when someone goes users router it will use this
app.use("/users", usersRouter);

//when someone goes aoi/v1/books router it will use this
app.use("/api/v1/books", booksRouter);

//when someone goes api/v1/products router it will use this
app.use("/api/v1/products", productsRouter);

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as templating engine
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
