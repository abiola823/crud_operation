const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const authRoute = require("./Routes/auth");
const itemsRoute = require("./Routes/items")

const connect = mongoose.connect(process.env.mongoDbUrl);

connect.then(() => {
    console.log("successfully connected to database");
}).catch((error) => {
    console.log("could not successfully connect to database " + error);
});


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/v1/auth", authRoute);
app.use("/v1/items", itemsRoute)



app.listen(port, () => {
   console.log(`listening on port ${port}`);
});
