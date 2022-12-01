const jwt = require("jsonwebtoken");
const config = process.env;

const technician_auth = (req, res, next) => {

    const token = req.cookies.token;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log(1)
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    console.log(2)
    req.user = decoded; 
    console.log(3)
    /*#############
    depends on database user_type
     */
    if (decoded.user_type != "technician") {
        console.log(4)
      return res.status(401).send("unauthorized request");
    } else {
      next();
    }
  
  } catch (err) {
    return res.status(401).send("Invalid Token"); //can redirect here
  }
  }
  
  
  module.exports = technician_auth;