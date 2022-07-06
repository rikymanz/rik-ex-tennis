const express = require('express')
const router = express.Router()
const Controller = require('../controllers/usersController')


http://localhost:3001/users/
router.get( '/', Controller.getAll )

http://localhost:3001/users/1
router.get( '/:id', Controller.getOne )



module.exports = router