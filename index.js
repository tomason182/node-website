const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

let errorPage = "";
fs.readFile("404.html", function (err, data) {
  if (err) {
    console.error("An error ocurred reading 404.html", err);
    return;
  }
  errorPage = data;
});

http
  .createServer(function (req, res) {
    const q = url.parse(req.url, true);

    let filePath = "." + q.pathname;
    if (filePath === "./") {
      filePath = "./index.html";
    }

    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(errorPage);
        return res.end();
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080, () => {
    console.log("Server running");
  });
