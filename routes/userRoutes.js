const express = require("express")
const router = express.Router()
const { getAllUsers, register, login, current } = require("../controller/userController")
const validateToken = require("../middleware/jwtTokenHandler")

router.route("/").get(getAllUsers)
router.route("/current").get(validateToken).get(current)
router.route("/register").post(register)
router.route("/login").post(login)

module.exports = router