const jwt = require("jsonwebtoken");
const {BadRequestError} = require("../errors");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    // Just for demo, normally provided by DB
    const id = new Date().getDate();

    // Generate token (use a strong secret in production)
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    console.log("Login successful:", { username, id });
    res.status(200).json({ msg: "User created", token });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

const dashboard = async (req, res, next) => {
  try {    
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    next(error);
  }
};

module.exports = {
  login,
  dashboard,
};
