import { Post } from "../model/PostModel.js"
import cloudinary from 'cloudinary'
import path  from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import { where } from "sequelize";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const createpost = async(req,res,next)=>{
    try {
        const {title} = req.body
        const file = req.file
     
        const id = req.user
        const filename = req.file.filename
        const filepath = path.resolve(__dirname,'../uploads',filename)
        // const result = await cloudinary.uploader.upload(filepath)
        const result = `http://localhost:4000/${filename}`;
        if( !title || !file){
            throw new Error("All field Are Mendotry")
        }
        await Post.create({
            title,
            image:result,
            userid:id
        })
        res.json({
            message : 'Post Created'
        })
    } catch (error) {
        next(error)
    }
}
export const getAllPost = async(req,res,next)=>{
    try {
       
      const post  = await Post.findAll({})
      if(post.length === 0) res.json({
        post : []
      })
        res.json({
            post
        })
    } catch (error) {
        next(error)
    }
}
export const getUserPost = async(req,res,next)=>{
    try {
        const id = req.user
        const post = await Post.findAll({where:{userid:id}})
        
        if(post.length === 0){
            res.json({
                success:false,
                message:"User Dont Have Post"
            })
        }
        res.json({
            success : true,
            post
        })
    } catch (error) {
        next(error)
    }
}

export const getSinglePost = async(req,res,next)=>{
    try {
        const {id} = req.params
        
        const post = await Post.findOne({where:{id:id}})
        res.json({
            post
        })
    } catch (error) {
        next(error)
    }
}