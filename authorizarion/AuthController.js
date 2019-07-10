var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

// check user
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var props = require('../props');
const path = require('path');

// go to the login page
router.get('/dashboard', function(req, res) {
  res.sendFile(path.resolve('./views/login.html'));
});

router.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error connecting.');
    if (!user) return res.status(404).send('User not found.');
    // check if password valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.send('Invalid login!');

    // if user success, create token
    var token = jwt.sign({ id: user._id }, props.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    // req.session({ myToken : token, secret : 'sgr@work' })
    // session({
    //   secret: 'sgr@work',
    //   resave : true,
    //   saveUninitialized : false,
    //   cookie : { maxAge: 60000 }
    // });
    // app.use(session({secret : 'sgrworking', resave : true, saveUninitialized : true}));
    // // app.use(session({secret : 'sgrworking'}));
    // var sess;
    // app.get('/',function(req,res){
    //   sess=req.session;
    //   sess.myEmail='sgr@ok.com';
    //   sess.myToken=token;
    // });
    // res.status(200).send({auth:true,token:token});
    
    res.redirect('/api/users');
    res.end();
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  }, 
  function (err, user) {
    if (err) return res.status(500).send("Err registering user.");

    // if user is registers, create token
    var token = jwt.sign({ id: user._id }, props.secret, {
      // expiresIn 24 hours
      expiresIn: 86400
    });
    res.status(200).send({ auth: true, token: token });
  });

});

module.exports = router;