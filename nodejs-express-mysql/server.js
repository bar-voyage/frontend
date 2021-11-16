const express = require("express");
const mysql = require("mysql");
const config = require("./config");

var con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

const app = express();

app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`testing bar voyage db on port ${port}`);
});

app.get("/", async (req, res) => {
    res.json({ status: "ready to test" });
});

app.get("/users", async (req, res) => {
    res.json({ status: "testing users" });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM users", function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });
});

module.exports = app;

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DB_NAME
});