require("dotenv").config();
const express = require("express");
const app = express();

const apiRoutes = require("./routes/api");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(express.static("./public"));

app.use((req, res, next) => {
  console.log(`[APP] Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use("/api/v1", apiRoutes);

app.use((req, res) => {
  console.log("[APP] Route not found:", req.method, req.path);
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[APP] Server is running on port ${PORT}...`));
