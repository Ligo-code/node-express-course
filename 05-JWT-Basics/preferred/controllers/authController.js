const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const logon = (req, res, next) => {
  const { name, password } = req.body;

  console.log("[LOGON] Incoming request:", { name, password });

  if (!name || !password) {
    console.log("[LOGON] Validation failed: Missing name or password");
    return next(new BadRequestError("Please provide name and password"));
  }

  const token = jwt.sign({ name }, process.env.JWT_SECRET);

  console.log("[LOGON] Token generated:", token);

  res.status(200).json({ token });
};

const hello = (req, res, next) => {
  console.log("[HELLO] Accessed by user:", req.user.name);
  res.status(200).json({
    message: `Hello, ${req.user.name}!`,
  });
};

module.exports = { logon, hello };
