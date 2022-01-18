const express = require('express')
const { users } = require('../controllers')

const router = express.Router()
router.get('/users', users.getUsers)

module.exports = router
