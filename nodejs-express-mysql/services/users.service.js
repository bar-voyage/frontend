const { usersDb } = require('../db')

const { getUsersService } = async () => {
    try {
        return await usersDb()
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getUsersService
}