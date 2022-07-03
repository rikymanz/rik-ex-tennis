const express = require('express')
const router = express.Router()
const Controller = require('../controllers/stringingController')

http://localhost:3001/stringing/
router.get( '/', Controller.getAll )

http://localhost:3001/stringing/12
router.get( '/:id', Controller.getOne )

http://localhost:3001/stringing/
router.post( '/', Controller.post )

http://localhost:3001/stringing/12
router.delete( '/:id', Controller.delete )

http://localhost:3001/stringing/12
router.patch('/:id', Controller.update ) 


module.exports = router
