require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    // get token for header
    const headerToken = req.get("Authorization");
    // check if we get the correct header token
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;
    // Compare header token with our secret token
    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    // if they are different, return the not authenticated error
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    next();
  },
};
