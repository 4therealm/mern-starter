const router = require("express").Router()
const {createUser, getUsers, getUserById, deleteUser} = require('../../controllers/userController')

router
  .route('/')
  .get(getUsers)

router
//used for the dashboard
  .route('/:id')
  // the getuserbyid is the endpoint we will include all the users pets and locations
  .get(getUserById)
  .delete(deleteUser)

  

  module.exports = router