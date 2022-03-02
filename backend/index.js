const bodyParser = require("body-parser");
const session = require('express-session');
const express = require("express");
const usersRoutes = require('./routes/usersController');
const cors = require('cors');
const store = new session.MemoryStore();
let port = process.env.PORT || 5500;
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
    proxy: true,
    name: 'connect.sid',
    cookie: {
        expires: 1000 * 60 * 60 * 24,
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }
}))


app.use(express.json());

/**
 * Change here your localhost location
 */
app.use(cors({
    origin: "https://test-front-office-api.herokuapp.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoutes);

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => console.log("Server is alive on 5500"));
