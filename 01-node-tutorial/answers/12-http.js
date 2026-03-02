const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to the homepage!");
  } else if (req.url === "/about") {
    res.end("Here is our short history.");
  } else {
    res.end(`<h1>Oops!</h1><p>We can't find the page you're looking for.</p>`);
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});