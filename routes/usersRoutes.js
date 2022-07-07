const express = require('express')
const router = express.Router()
const Controller = require('../controllers/usersController')
const { authenticateToken } = require('./../helpers/authHelper')


http://localhost:3001/users/
router.get( '/', authenticateToken ,Controller.getAll )

http://localhost:3001/users/1
router.get( '/:id', authenticateToken ,Controller.getOne )


http://localhost:3001/users/login/
router.post( '/login', Controller.login )





module.exports = router