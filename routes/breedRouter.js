const router = require("express").Router({mergeParams: true})
const { getBreedList, getBreedListById } = require("../controllers/breedsController")

router.route("/")
.get(getBreedList)

router.route("/:sid")
.get(getBreedListById)

module.exports = router