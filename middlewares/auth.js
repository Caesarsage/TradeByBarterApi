import ErrorResponse from "../utils/errorResponse";

const jwt = require("jsonwebtoken");

module.exports.authenticateUser = async (req, res, next) => {
  try {
    // check if there is an authorization token
    if (!req.headers.authorization) {
      return next(new ErrorResponse("authorization header required", 401));
    }
    let splittedHeader = await req.headers.authorization.split(" ");
    if (splittedHeader[0] !== "Bearer") {
      return next(new ErrorResponse("authorization format is Bearer <token>", 401))
    }
    let token = await splittedHeader[1];
    // decode user
    const userToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!userToken) return next(new ErrorResponse("Invalid authorization token, please login", 403))
    // allow to continue with request
    console.log(userToken);
    req.user = userToken;
    next();
  } catch (error) {
    next(error)
  }
};

export const checkIfAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next( new ErrorResponse("Protected Route, admin only", 403))
    }
    return next();
  } catch (error) {
    next(error)
  }
};
