const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.DB_CONNECTION)
const conn = process.env.DB_CONNECTION;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db = process.env.DB_DATABASE;

/**
 * Add your MongoDB informations here
 * local : "mongodb://localhost:27017/node-login"
 * online : "mongodb://cluster0-shard-00-02.l9hpw.mongodb.net:27017/node-login"
 */
mongoose.connect(`mongodb+srv://dtdbmgdb:xCQ1MHr8WbiQdXG4@cluster0.l9hpw.mongodb.net/node-login?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).
    then(console.log("Database is connected !")).
    catch(err => console.error(`Error with database connection : ${err}`))

