const express = require("express");
const path = require("path");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const DB_PATH = "./secrets.db";
const { dbSchema } = require("./dbSchema");

const DB = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Connected to ${DB_PATH} database`);
});

DB.exec(dbSchema, (err) => {
  err && console.log(err);
});

const seeds = () => {
  DB.run("INSERT INTO Users (login, password, secret) VALUES ('user1', 'pass1', 'secret1')", (err) => err && console.log(err));
  DB.run("INSERT INTO Users (login, password, secret) VALUES ('user2', 'pass2', 'secret2')", (err) => err && console.log(err));
  DB.run("INSERT INTO Users (login, password, secret) VALUES ('user3', 'pass3', 'secret3')", (err) => err && console.log(err));
};
// seeds();

app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.post("/secret", (req, res) => {
  const { login, password } = req.body;
  const request = `SELECT secret FROM users WHERE login = '${login}' AND password = '${password}';`;
  DB.all(request, (err, rows) => {
    err && console.log(err);
    res.send(rows);
  })
});

app.post("/secret_safe", (req, res) => {
  const { login, password } = req.body;
  const request = "SELECT secret FROM users WHERE login = ? AND password = ?";
  DB.all(request, [login, password], (err, rows) => {
    err && console.log(err);
    res.send(rows);
  })
});

app.listen(7102, () => {
  console.log("Server listening on port 7102");
});
