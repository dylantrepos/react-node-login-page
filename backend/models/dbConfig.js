const mongoose = require("mongoose");

/**
 * Add your MongoDB informations here
 */
mongoose.connect("mongodb://localhost:27017/node-login").
    then(console.log("Database is connected !")).
    catch(err => console.error(`Error with database connection : ${err}`))
