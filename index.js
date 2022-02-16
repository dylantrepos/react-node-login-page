const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const usersRoutes = require('./routes/usersController');
require("./models/dbConfig");

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.listen(5500, () => console.log("Server is alive on 5500"));
