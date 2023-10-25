const express = require("express");
const app = express();
const port = 5000 || process.env.PORT;
require("dotenv").config();

app.get("^/$|/home(.html)?", async (req, res) => {
    res.send('Welcome');
});




app.listen(port, () => {
   console.log(`listening on port ${port}`);
});
