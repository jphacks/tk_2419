const http = require('http');
const fs = require('fs');
const os = require("os");
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static('./'));

const folderPath = path.join(__dirname, 'modules');
const moduleFiles = fs.readdirSync(folderPath);
for (const file of moduleFiles.filter((file) => file.endsWith('.js'))) {
	const filePath = path.join(folderPath, file);
	require(filePath);
}

// get host ip
function getIpAddress() {
	const nets = os.networkInterfaces();
	const net = nets["en0"]?.find((v) => v.family == "IPv4");
	return !!net ? net.address : null;
}
const hostname = getIpAddress();
app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: false }));

// index.htmlを返す
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// 3000番ポートで待ち受け
app.listen(3000);
console.log(`\nServer running at http://${hostname}:3000/\nor if you use localhost: http://localhost:3000/`);