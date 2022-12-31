const jwt = require("jsonwebtoken");
const config = process.env;
var Cookie = require('cookie');

function getTokenCookie(request){
  console.log(request.headers['donut']);
  var rawcookies = request.headers['donut'];
  console.log(rawcookies);
  for (var i in rawcookies) {
    const cookie = Cookie.parse(rawcookies[i]);
    if(cookie.token != undefined){
      console.log(cookie);
      return cookie.token;
    }
  }
  return undefined;
} 

const verifyToken = (req, res, next) => {

  const token = getTokenCookie(req);
  // console.log("token: " + token);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    res.clearCookie("token");
    console.log("cookie clear")
    if (err.name === 'TokenExpiredError') {
      return res.status(205).send("Token Expired")
    }
    return res.status(401).send("Invalid Token"); //can redirect here
  }

  return next();
};

 
module.exports = verifyToken;