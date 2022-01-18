const { userService } = require('../services')
const { getUsersService } = usersService

const getUsers = async (req, res, next) => {
    try {
        await getUsersService().then(result => {
            res.sendStatus(200)
                .send(result)
        });
        // console.log(res)
        // res.sendStatus(200)
    }
    catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

module.exports = {
    getUsers
}