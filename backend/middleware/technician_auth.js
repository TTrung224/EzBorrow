const jwt = require("jsonwebtoken");
const config = process.env;

const technician_auth = (req, res, next) => {

  

    const token = req.cookies.token;
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