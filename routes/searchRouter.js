var express = require("express");
const { filterBreeds } = require("../controllers/breedsController");
var router = express.Router();


router.route("/")
.get(filterBreeds)

module.exports = router