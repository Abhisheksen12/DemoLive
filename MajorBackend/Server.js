// step-1
const express = require("express");
require("dotenv").config();
const ConnectDb = require("./configuration/ConnectDb.js");
const fileUpload = require("express-fileupload");

// step-2
const app = express();

// step-3 (middlewares)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

var cookieParser = require('cookie-parser')
app.use(cookieParser())

// step-4 (routes)
app.get("/", (req, res) => {
  res.send("<b>Home Page</b>");
});

// step-5 (custom routes)
const AuthRoute = require("./routes/AuthRoute.js");
app.use("/api/v1/auth", AuthRoute);

const categoryRoute = require("./routes/Category.js");
app.use("/api/v1/category", categoryRoute);

const productRoute = require("./routes/Product.js");
app.use("/api/v1/product", productRoute);



const AddressRoute = require("./routes/AddressRoute.js");
app.use("/api/v1/address", AddressRoute);



// step-6 (database + server start)
const port = process.env.PORT || 4000;

ConnectDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running at port ${port}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to DB:", err);
});



