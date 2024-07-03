const express = require('express')
const router = express.Router()

const {createUser, retrieveUser,getUsers} =  require('./controller.js')
const {validateCreateUser} = require('./validation.js')

router.post('/create-user', validateCreateUser, createUser)
router.get('/get-user/:id',  retrieveUser),
router.get('/filter-user', getUsers)

module.exports = router