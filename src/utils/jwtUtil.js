const jwt = require("jsonwebtoken");
const { dirname } = require("path");
console.log({ dirname: __dirname});
const private = require("fs").readFileSync(__dirname+"/../key.pem", 'utf8');
const public = require("fs").readFileSync(__dirname+"/../key.pub", 'utf8');
console.log({ private, public});
const generateToken = ({ userId, role}) => {
  return jwt.sign({ userId, role}, private, { expiresIn: "120s", algorithm: 'RS256'})
}

const verifyToken = (token) => {
  return jwt.verify(token, public)
}

module.exports = {
  generateToken,
  verifyToken
}