import express from 'express'
import { createpost, getAllPost, getSinglePost, getUserPost } from '../controller/PostController.js'
import {upload} from '../middelware/Fileupload.js'
import { isAuthenticated } from '../middelware/auth.js'
const router = express.Router()




router.route('/createpost').post(isAuthenticated,upload,createpost)
router.route('/getallpost').get(getAllPost)
router.route('/getuserpost').get(isAuthenticated,getUserPost)
router.route('/post/:id').get(isAuthenticated,getSinglePost)

export default router