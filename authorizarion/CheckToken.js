var jwt = require('jsonwebtoken');
var props = require('../props');

function verifyToken(req, res, next) {
  // check header for token
  var token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token.' });

  jwt.verify(token, props.secret, function(err, decoded) {      
    if (err) 
      return res.status(401).send({ auth: false, message: 'Invalid token.' });    

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;