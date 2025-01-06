const notFoundMiddleware = (req, res) => {
    console.warn("Route not found:", req.originalUrl);
    res.status(404).json({ msg: "Route not found" });
  };
  
  module.exports = notFoundMiddleware;
  
  // errors/custom-error.js
  class CustomAPIError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = CustomAPIError;