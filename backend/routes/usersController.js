const express = require("express");
const router = express();
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt = require("bcryptjs");

const { UsersModel } = require("../models/userModel");

const errIdUnknown = (res, req) => (res.status(400).send(`ID unknown : ${req.params.id}`));

// Get all the users
router.get('/', (req, res) => {
    UsersModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.error(`Error getting data from all users : ${err}`)
    });
});

// Find a user by email
router.get('/get/:email', (req, res) => {
  UsersModel.findOne({email: new RegExp('^'+req.params.email+'$', "i")}, function(err, doc) {
    if(err) console.error(`Error finding user : ${err}`)
    if(doc === null) res.send({error: true})
    else res.send(doc);
  });
});

// Check if login credential are correct
router.get('/login', (req, res) => {
    if(req.session.user) {
        console.log('yes')
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        console.log('no')
        res.send({ loggedIn: false })
    }
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    UsersModel.findOne({email: email}, function(err, doc) {
        if(err) return console.error(`Error login user : ${err}`)
        if(doc === null) return res.send({error: true})
        if(bcrypt.compareSync(password, doc.password)) {
            req.session.user = doc;
            //req.session.save();
            console.log('back : ' + (req.session.user));
            res.send(doc);
        }    
        else return res.send({error: true})
      });
});


// Create a new user
router.post('/', (req, res) => {
    const newUser = new UsersModel({
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            name: req.body.name,
            dob: req.body.dob,
            city: req.body.city,
        });
        
        newUser.save((err, docs) => {
            if(!err) res.send(docs);
            else console.error(`Error creating new user : ${err}`)
        }); 
    });
    
    // Update a user by ID
    router.put('/:id', (req, res) => {
        if(!ObjectID.isValid(req.params.id)) return errIdUnknown(res, req);
        
        const updateUser = {
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            name: req.body.name,
            dob: req.body.dob,
            city: req.body.city,
    };

    UsersModel.findByIdAndUpdate(
        req.params.id, 
        { $set: updateUser },
        { new:  true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.error(`Error updating user : ${err}`);
        }
    );
    
});

// Remove a user by ID
router.delete("/:id", (req, res) => {
    if(!ObjectID.isValid(req.params.id)) return errIdUnknown(res, req);

    UsersModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs);
            else console.error(`Error deleting a user : ${err}`)
        }
    );
});

module.exports = router;