const express = require('express');
const router = express.Router();
const {itemsCollection} = require('../schema/itemSchema');
const {isUserLoggedIn, adminsOnly} = require("./middleware");
const authRoute = require("./auth");
require('dotenv').config();


router.get("/", async (req, res) => {
    const items = await itemsCollection.find({ user: req.decoded.userId });
    res.json(items);
  });

  router.post("/", async (req, res) => {

    try {
      const {name, description, price, isInStore, } = req.decoded;
      const newItem = await itemsCollection.create({
        name,
        description,
        price,
        isInStore,
        user: userId
      });
  
      res.json({
        isRequestSuccesful: true,
        newItem
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("internal-server-error");
    }
  });
    module.exports = router;