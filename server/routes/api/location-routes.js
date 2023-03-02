const router = require("express").Router()
const { createLocation, getLocations, getLocation, updateLocation, removeLocation  } = require("../../controllers/locationController")

router
  .route("/")
  .post(createLocation)
  .get(getLocations)


router 
  .route("/:id")
  .get(getLocation)
  .put(updateLocation)
  .delete(removeLocation)


  // router
  // .route("/:id/lost")



  
  module.exports = router