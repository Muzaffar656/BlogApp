import express from 'express'
import { getuser, login, logout, register, } from '../controller/UserController.js'
const router = express.Router()
import { upload } from '../middelware/Fileupload.js'
import { isAuthenticated } from '../middelware/auth.js'

router.route("/register").post(upload,register)
router.route("/login").post(upload,login)
router.route('/me').get(isAuthenticated,getuser)
router.route('/logout').get(logout)

export default router



// router.route("/verify").get(verifyEmail)