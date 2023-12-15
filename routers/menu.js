const express = require('express')
const router = express.Router()
const MenuController = require('../controllers/menuController')

router.get('/menus', MenuController.fetchMenuList)

module.exports = router