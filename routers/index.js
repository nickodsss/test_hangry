const express = require('express')
const router = express.Router()
const locationRouter = require('./location')
const menuRouter = require('./menu')
const cartRouter = require('./cart')

router.use(locationRouter)
router.use(menuRouter)
router.use(cartRouter)

module.exports = router
