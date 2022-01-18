const { config } = require('../server')

const { usersDb } = () => {

    con.query("SELECT * FROM users", function (err, result) {
        if (err) throw err;
        return result;
    });
    // return result;
}

module.exports = {
    usersDb
}