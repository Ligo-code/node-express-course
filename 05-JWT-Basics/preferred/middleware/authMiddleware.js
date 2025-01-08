const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("[AUTH] Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("[AUTH] No token provided or invalid format");
    return next(new UnauthenticatedError("No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name: payload.name };
    console.log("[AUTH] Token verified, user:", req.user.name);
    next();
  } catch (error) {
    console.log("[AUTH] Invalid token:", error.message);
    return next(new UnauthenticatedError("Not authorized to access this route"));
  }
};

module.exports = authMiddleware;
