const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const express = require("express");
const usersRoutes = require('./routes/usersController');
const cors = require('cors');
require("./models/dbConfig");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "theSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
        secure: false,
        path: '/'
    }
}))


app.use('/users', usersRoutes);

app.listen(5500, () => console.log("Server is alive on 5500"));
