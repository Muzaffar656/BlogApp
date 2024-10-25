import express from 'express'
import { addLike, getPostLike, likeCount, Unlike } from '../controller/Like.js'
import { isAuthenticated } from '../middelware/auth.js'
const router = express.Router()


router.route('/addlike/:id').post(isAuthenticated,addLike)
router.route('/countlike/:id').get(likeCount)
router.route('/unlike/:id').delete(isAuthenticated,Unlike)
router.route('/getpostlike/:id').get(isAuthenticated,getPostLike)






export default router