const jwt = require("jsonwebtoken");

// Generate JWT
const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

module.exports = createToken;