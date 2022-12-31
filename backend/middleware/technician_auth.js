const jwt = require("jsonwebtoken");
const config = process.env;
var Cookie = require('cookie');

function getTokenCookie(request){
  // console.log(request.headers['donut']);
  const cookie = Cookie.parse(request.headers['donut']);
  console.log(cookie);
  if(cookie.token != undefined){
    return cookie.token;
  }

  return undefined;
}

const technician_auth = (req, res, next) => {

  const token = getTokenCookie(req);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded; 
    /*#############
    depends on database user_type
     */
    if (decoded.user_type != "technician") {
      return res.status(401).send("unauthorized request");
    } else {
      next();
    }
  
  } catch (err) {
    return res.status(401).send("Invalid Token"); //can redirect here
  }
  }
  
  
  module.exports = technician_auth;