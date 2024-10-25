import { Comments } from "../model/Comment.js"
export const createComment = async(req,res,next)=>{
    try {
        const {id} = req.params
        const userId = req.user
        const {comment} = req.body
        console.log(id,userId,comment)
        const newComment = await  Comments.create({
            comment:comment,
            userId:userId,
            postId:id
        })
        res.json({
            message:'comment added',
            newComment
        })

    res.json({
        id
    })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const getAllComment = async(req,res,next)=>{
    try {
        const id = req.user
        const coments = await Comments.findAll({})
        
        res.json({
            coments:coments
        })

    } catch (error) {
        next(error)
    }
}

export const getpostComent = async(req,res,next)=>{
    try {
              const {postId} = req.body
              const post = await Comments.findAll({where:{postId:postId}})
            res.json(post)
        
    } catch (error) {
        next(error)
    }
}
