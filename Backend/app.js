import express from 'express'
const app = express()
import user from './route/UserRoute.js'
import post from './route/PostRoute.js'
import comment from './route/CommentRoute.js'
import like from './route/LikeRoute.js'
import { User } from './model/UserModel.js'
import { Post } from './model/PostModel.js'
// import { Comments } from './model/Comment.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path';
import cloudinary from 'cloudinary'
// create table in database
User.sync()
Post.sync()
Comments.sync()
Like.sync()
User.hasOne(Post)
Post.belongsTo(User)
// .....
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'))

// middelwares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    
}))
cloudinary.config({ 
    cloud_name: "dlinbaowa",
    api_key:"811992712136645" , 
    api_secret:"rpCZ7kD4XR03pXq3xtGvtQBcqRE"
  });

// ejs setup
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set(express.static, path.join(__dirname, 'views'));







app.use('/api/v1',user)
app.use('/api/v1',post)
app.use('/api/v1',comment)
app.use('/api/v1',like)


import multer from "multer"
import { Comments } from './model/Comment.js'
import { Like } from './model/Like.js'
const upload = multer({dest:"uploads/"})


const PORT = 4000


// Error Middelware
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Error'
    res.status(err.statusCode).json({
        message : err.message
    })
})

app.listen(PORT,()=>{
    console.log(`Server is Listening on PORT : http://localhost:${PORT}`)
})