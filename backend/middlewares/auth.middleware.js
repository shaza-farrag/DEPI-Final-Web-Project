const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const asyncHandler = require("./asyncHandler");
const ApiError = require("../utils/ApiError");

const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  req.user = user;

  next();
});

module.exports = verifyToken;