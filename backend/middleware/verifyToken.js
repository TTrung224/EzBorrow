const jwt = require("jsonwebtoken");
const config = process.env;

function getTokenCookie(request){
  console.log(request.headers['cookie']);
  let rawcookies = request.headers['cookie'];
  rawcookies = rawcookies.split(';');
  console.log("raw===", rawcookies);
  for (let i in rawcookies) {
    console.log("adfsadfs===", rawcookies[i])
    const cookie = rawcookies[i].split('=');
    cookie[0] = cookie[0].trim();
    cookie[1] = cookie[1].trim();
    console.log(cookie[0]);
    console.log(cookie[1]);
    if(cookie[0] == "token" && cookie[1]){
      console.log("123")
      return cookie[1];
    }

  }
  return undefined;
}

const verifyToken = (req, res, next) => {

  const token = getTokenCookie(req);

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