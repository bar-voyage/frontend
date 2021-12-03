const { application } = require("express");
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`testing bar voyage db on port ${port}`);
});

app.get("/", async (req, res) => {
    res.json({ status: "ready to test" });
});

app.get("/users", async (req, res) => {
    res.json({ status: "getting users" });
    con.query("SELECT * FROM users", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});

app.get("/categories", async (req, res) => {
    res.json({ status: "getting categories" });
    con.query("SELECT * FROM category", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});

app.post('/user-pref', (req, res) => {
    console.log(req.body)
    //TODO: Should probably check that the user id is valid, that the categories are valid, etc
    res.json({ status: "posting user prefs" });
    //     //TODO: Better error responses
    for (i = 0; i < req.body.pref.length; i++) {
        var query = "SELECT category_id FROM category WHERE category_name = \"" + req.body.pref[i] + "\";"
        con.query(query, function (err, result) {
            // TODO: Better error responses
            if (err) throw err;

            var rows = JSON.parse(JSON.stringify(result[0]));
            query = "INSERT IGNORE INTO user_pref (user_id, category_id) VALUES (" + req.body.user_id + ", " + rows.category_id + ");"
            con.query(query, function (err, result) {
                // TODO: Better error responses
                if (err) throw err;
            })
        });
    }

    // Just returns the Request body and 200 OK status - this could be better
    res.json(req.body)
});

app.get('/bars', async (req, res) => {
    console.log(req.body)
    res.json({ status: "getting bars" });
    con.query("SELECT * FROM bar", function (err, result) {
        if (err) throw err;
        // con.end();
        console.log(result);
    });
});

app.post('/register', (req, res) => {
    console.log(req.body)

    // TODO: figure out error checking for existing users 
    res.json({ status: "posting user registration " });
    var query = "INSERT INTO users (email, pass) VALUES (\"" + req.body.email + "\", \"" + req.body.password + "\");"
    console.log(query)
    con.query(query, function (err, result) {
        if (err) throw err;
    })
});

app.get('/login', (req, res) => {
    console.log(req.body)

    // TODO: figure out error checking for existing users 
    var query = "SELECT COUNT(*) AS num_users FROM users WHERE email = \"" + req.body.email + "\" AND pass = \"" + req.body.password + "\";"
    con.query(query, function (err, rows) {

        if (err) throw err;

        if (rows[0].num_users == 1) {
            res.json({status: "login accepted"})
        }
        else {
            res.json({status: "login failed"})
        }
    })


});

module.exports = app;

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DB_NAME
});