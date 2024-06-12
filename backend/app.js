const express = require("express");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const productroutes = require("./routes/productroute");
const userroutes = require("./routes/userroute");
const orderroutes = require("./routes/orderroute");

app.use("/api/v1" , productroutes);
app.use("/api/v1" , userroutes);
app.use("/api/v1" , orderroutes);

module.exports = app;