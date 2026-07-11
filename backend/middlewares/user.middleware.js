const ApiError = require("../utils/ApiError");

const isUser = (req, res, next) => {
  if (req.user.role !== "user") {
    throw new ApiError(
      403,
      "Only users can access this resource"
    );
  }

  next();
};

module.exports = isUser;