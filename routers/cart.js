const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')

router.get('/carts', CartController.listCart)
router.post('/carts/:id', CartController.addCart)
router.delete('/carts/:id', CartController.removeCart)
router.post('/checkout', CartController.checkout)

module.exports = router