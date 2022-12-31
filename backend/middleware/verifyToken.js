const jwt = require("jsonwebtoken");
var Cookie = require('request-cookies').Cookie;

const config = process.env;

function getCookies(request){
  var cookies = null;
  var rawcookies = request.headers['Set-Cookie'];
  for (var i in rawcookies) {
    const cookie = new Cookie(rawcookies[i])
    cookies[cookie.key] = cookie.value;
    console.log(cookie.key + ": " + cookie.value);
  }
  return cookies;
}

const verifyToken = (req, res, next) => {
  const cookies = getCookies(req);
  if(cookies != null){
    const token = cookies.token;
  }
  // const token = req.cookies.token;
  console.log("token=", token);
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
      return res.status(401).send("Token Expired")
    }
    return res.status(401).send("Invalid Token"); //can redirect here
  }

  return next();
};

 
module.exports = verifyToken;