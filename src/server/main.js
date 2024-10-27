import express from "express";
import ViteExpress from "vite-express";
import sqlite3 from "sqlite3";

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.get("/getdb", (req, res) => {
	
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
