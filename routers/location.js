const express = require('express')
const router = express.Router()
const LocationController = require('../controllers/locationController')

router.get('/locations', LocationController.fetchLocationList)

module.exports = router