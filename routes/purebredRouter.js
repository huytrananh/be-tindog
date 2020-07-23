const { createPurebred, getPurebredList, getSinglePurebred, updatePurebred, deletePurebred } = require("../controllers/purebredController")
const {kennelRequired, loginRequired} = require("../middleware/auth")
const router = require("express").Router({mergeParams: true})

router.route("/")
.get(getPurebredList)
.post(loginRequired, kennelRequired, createPurebred)

router.route("/:purebredId")
.get(getSinglePurebred)
.patch(loginRequired, kennelRequired, updatePurebred)
.delete(deletePurebred)

module.exports = router