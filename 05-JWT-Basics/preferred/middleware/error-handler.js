
const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error("[ERROR HANDLER] Error occurred:", err.message);

  if (err instanceof CustomAPIError) {
    console.error("[ERROR HANDLER] Custom error:", {
      message: err.message,
      statusCode: err.statusCode,
    });
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error("[ERROR HANDLER] Unknown error:", err);
  res.status(500).json({ message: "Something went wrong, try again later" });
};

module.exports = errorHandlerMiddleware;
