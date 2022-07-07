const express = require('express')
const router = express.Router()
const Controller = require('../controllers/stringingController')
const { authenticateToken } = require('./../helpers/authHelper')

http://localhost:3001/stringing/
router.get( '/', authenticateToken ,Controller.getAll )

http://localhost:3001/stringing/12
router.get( '/:id', authenticateToken ,Controller.getOne )

http://localhost:3001/stringing/
router.post( '/', authenticateToken ,Controller.post )

http://localhost:3001/stringing/12
router.delete( '/:id', authenticateToken , Controller.delete )

http://localhost:3001/stringing/12
router.patch('/:id', authenticateToken ,Controller.update ) 


module.exports = router
