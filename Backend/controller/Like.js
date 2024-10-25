import { Like } from "../model/Like.js"
export const addLike = async(req,res,next)=>{
    try {
        const {id} = req.params
        const userId = req.user

        const [like, created] = await Like.findOrCreate({
            where:{postId:id,userId:userId}
          });
      
          if (!created) {
            return res.status(400).json({ message: 'Like already exists' });
          }
        res.json({
            message:'Like added',
            like
        })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const Unlike = async (req,res,next)=>{
    try {
        const {id} = req.params
        const userId = req.user
        await Like.destroy({where:{userId:userId,postId:id}})
        res.status(200).json({ message: 'Post unliked' });
    } catch (error) {
        next(error)
    }
}

export const likeCount = async(req,res,next)=>{
    try {
        const {id} = req.params
  const likecount = await Like.count({where:{postId:id}})
  res.json({
    likecount
  })
    } catch (error) {
        next(error)
    }
}

export const getPostLike = async(req,res,next)=>{
    try {
        const {id} = req.params
        const userId = req.user
        const like = await Like.findOne({where:{postId:id,userId:userId}})
        
        if (like) {
            return res.status(200).json({ liked: true });
          } else {
            return res.status(200).json({ liked: false });
          }
    } catch (error) {
        next(error)
    }
}