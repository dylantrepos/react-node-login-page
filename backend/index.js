const bodyParser = require("body-parser");
const session = require('express-session');
const express = require("express");
const usersRoutes = require('./routes/usersController');
const cors = require('cors');
const store = new session.MemoryStore();
require("./models/dbConfig");


const app = express();

app.use((req, res, next) => {
    console.log(store.sessions);
    next()
})

app.use(session({
    secret: "theSecretKey",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        expires: 1000 * 60 * 60 * 24,
    }
}))


app.use(express.json());

/**
 * Change here your localhost location
 */
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoutes);

app.listen(5500, () => console.log("Server is alive on 5500"));
