const router = require("express").Router()
const { createPet, getPets, getPet, updatePet, removePet, getOwnersPets, reportLostPet } = require("../../controllers/petController")

router
  .route("/")
  .post(createPet)
  .get(getPets)

router
  .route("/:id")
  .get(getPet)
  .put(updatePet)
  .delete(removePet)

  router
  .route("/owner/:_id")
  .get(getOwnersPets)
  .post(reportLostPet)
  



  module.exports = router