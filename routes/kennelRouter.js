const { getKennelList, createKennel, updateKennel, deleteKennel, getSingleKennel } = require("../controllers/kennelController");
const {kennelRequired, loginRequired} = require("../middleware/auth");
const purebredRouter = require("./purebredRouter");
const Kennel = require("../models/kennelModel");
const router = require("express").Router({mergeParams: true});

router.use("/:kennelId/purebred", purebredRouter)

router.route("/")
.get(getKennelList)
.post(loginRequired, kennelRequired, createKennel)




router.route("/:kennelId")
.patch(updateKennel)
.delete(deleteKennel)
.get(getSingleKennel)



module.exports = router;
