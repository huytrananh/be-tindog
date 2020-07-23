var express = require("express");
var router = express.Router();
const { getUserList, createUser, updateUser, getMyProfile, createUserAdmin, upgradeToKennel } = require("../controllers/userController");
const { loginRequired, adminRequired, kennelRequired } = require("../middleware/auth");
const { loginWithEmail } = require("../controllers/authController");
const { createKennel } = require("../controllers/kennelController");
// var kennelRouter = require("./routes/kennelRouter")


/* GET users listing. */
router.route("/")
.get(getUserList)
.post(createUser)

router.route("/:userId")
// .get(getMyProfile)


router.route("/me")
.get(loginRequired, getMyProfile)
.patch(loginRequired,updateUser)

router.route("/admin")
.post(createUserAdmin)

router.route("/upgrade")
.put(loginRequired, upgradeToKennel)



module.exports = router

