const router = require('express').Router()
// const userRoutes = require('./user-routes')
const statusRoutes = require('./status-routes')
const petRoutes = require('./pet-routes')
const locationRoutes = require('./location-routes')


// router.use('/users', userRoutes)
router.use('/status', statusRoutes) 
router.use('/pets', petRoutes)
router.use('/locations', locationRoutes)


module.exports = router;