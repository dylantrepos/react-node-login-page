const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.DB_CONNECTION)
const conn = process.env.DB_CONNECTION;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db = process.env.DB_DATABASE;


mongoose.connect(`your-db-config`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).
    then(console.log("Database is connected !")).
    catch(err => console.error(`Error with database connection : ${err}`))

