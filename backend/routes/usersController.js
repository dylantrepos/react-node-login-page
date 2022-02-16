const express = require("express");
const router = express();
const ObjectID = require("mongoose").Types.ObjectId;

const { UsersModel } = require("../models/userModel");

const errIdUnknown = (res, req) => (res.status(400).send(`ID unknown : ${req.params.id}`));

// Get all the users
router.get('/', (req, res) => {
    UsersModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.error(`Error getting data from all users : ${err}`)
    });
});

// Find a user by id
router.get('/:id', (req, res) => {
   if(!ObjectID.isValid(req.params.id)) return errIdUnknown(res, req);
   UsersModel.findById(req.params.id, (err, docs) => {
       if(!err) res.send(docs);
       else console.error(`Error getting data from one user : ${err}`)
   })

});

// Create a new user
router.post('/', (req, res) => {
    const newUser = new UsersModel({
            username: req.body.username,
            password: req.body.password,
            status: req.body.status,
            name: req.body.name,
            email: req.body.email
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
            username: req.body.username,
            password: req.body.password,
            status: req.body.status,
            name: req.body.name,
            email: req.body.mail
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