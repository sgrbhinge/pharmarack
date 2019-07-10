var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var User = require('./User');

// console.log('Into the user controller!');
// fetch all users
router.get('/', function (req, res) {
    console.log('Into GET');
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("Err finding user.");
        res.status(200).send(users);
    });
});

// create usr
router.post('/', function (req, res) {
    console.log('Into POST');
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }, 
    function (err, user) {
        if (err) return res.status(500).send("Err addding user.");
        res.status(200).send(user);
    });
});

// fetch single user
router.get('/:id', function (req, res) {
    console.log('Into GET id');
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Err finding user.");
        if (!user) return res.status(404).send("No user");
        res.status(200).send(user);
    });
});

// delete user
router.delete('/:id', function (req, res) {
    console.log('Into DELETE');
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("Err deleting user.");
        res.status(200).send("User deleted.");
    });
});

// update user
router.put('/:id', function (req, res) {
    console.log('Into PUT');
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("Err updating user.");
        res.status(200).send(user);
    });
});


module.exports = router;