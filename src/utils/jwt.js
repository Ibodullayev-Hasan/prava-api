const jwt = require("jsonwebtoken");
require("dotenv").config();


// sign
const my_sign_mtd = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY);
};

// verify
const my_verify_mtd = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    return;
  }
};


module.exports = {
    my_sign_mtd,
    my_verify_mtd
}