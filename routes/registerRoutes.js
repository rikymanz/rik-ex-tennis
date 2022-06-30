const express = require('express')
const router = express.Router()
const Controller = require('../controllers/registerController')


// Get all wallets
router.get( '/',Controller.getAll )

// Get one wallet
router.get( '/:id', Controller.getOne )

// post wallet
router.post( '/', Controller.post )

// delete wallet
router.delete( '/:id', Controller.delete )

// update
router.patch('/:id', Controller.update ) 


module.exports = router
