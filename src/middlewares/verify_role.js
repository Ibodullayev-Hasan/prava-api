const User = require("../modules/user_registeration/model_users"); // Adjust the path as needed
const { my_verify_mtd } = require("../utils/jwt");

const verifyRole = (...roles) => {
  return async (req, res, next) => {
    try {
      let { token } = req.headers;

      if (!token) {
        return res.status(403).send({
          success: false,
          message: "🧐 Token not available 🤷‍♂️",
        });
      }

      // Verify the token and extract the payload
      let payload;

      try {
        payload = my_verify_mtd(token);
      } catch (err) {
        return res.status(403).send({
          success: false,
          message: "Invalid token ⚡",
        });
      }

      // Fetch the user from MongoDB using the ID from the token payload
      const user = await User.findById(payload.id);

      if (user) {
        if (roles.includes(user.role)) {
          next();
        } else {
          return res.status(403).send({
            success: false,
            message: "You are not allowed ⚠️",
          });
        }
      } else {
        return res.status(403).send({
          success: false,
          message: "User not found ⚡",
        });
      }
    } catch (error) {
      return res.status(error.status || 500).send({
        success: false,
        message: error.message,
      });
    }
  };
};

module.exports = verifyRole;
