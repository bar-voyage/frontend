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

app.get("/categories", async (req, res) => {
    res.json({ status: "testing users" });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM categories", function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });
});

app.post('/user-pref', (req, res) => {
    console.log(req.body)
    //TODO: Should probably check that the user id is valid, that the categories are valid, etc
    con.connect(function (err) {
        //TODO: Better error responses
        if (err) throw err;
        for(i = 0; i < req.body.pref.length; i++) {
            var query = "SELECT category_id FROM category WHERE category_name = \"" + req.body.pref[i] + "\";"
            con.query(query, function (err, result) {
                // TODO: Better error responses
                if (err) throw err;

                var rows = JSON.parse(JSON.stringify(result[0]));            
                query = "INSERT IGNORE INTO user_pref (user_id, category_id) VALUES (" + req.body.user_id + ", " + rows.category_id + ");"
                con.query(query, function (err, result) {
                    // TODO: Better error responses
                    if(err) throw err;
                })
            });
        }
    });

    // Just returns the Request body and 200 OK status - this could be better
    res.json(req.body)
});
  

module.exports = app;

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DB_NAME
});