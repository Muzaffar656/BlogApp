import express from 'express'
import { createComment, getAllComment, getpostComent } from '../controller/Comment.js'
import { isAuthenticated } from '../middelware/auth.js'
const router = express.Router()


router.route('/addcomment/:id').post(isAuthenticated,createComment)
router.route('/getallcomment').get(getAllComment)
router.route('/getpostcoment').post(getpostComent)



export default router