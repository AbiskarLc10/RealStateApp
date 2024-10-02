const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next({ status: 401, message: "Token is expired" });
    }

    jwt.verify(token, process.env.PRIVATEKEY, (err, data) => {
      if (err) {
        return next({ status: 401, message: "Unauthorized" });
      }

      req.user = data;

      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
