const http = require('http');
const fs = require('fs');
const os = require("os");

// get host ip
function getIpAddress() {
  const nets = os.networkInterfaces();
  const net = nets["en0"]?.find((v) => v.family == "IPv4");
  return !!net ? net.address : null;
}

const hostname = getIpAddress();

const server = http.createServer((req, res) => {
	fs.readFile("index.html", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error\n");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
	});
});

// 3000番ポートで待ち受け
server.listen(3000);
console.log(`\nServer running at http://${hostname}:3000/\nor if you use localhost: http://localhost:3000/`);