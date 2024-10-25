import { SECRET_KEY } from "../controller/UserController.js"
import  jwt  from "jsonwebtoken"


export const isAuthenticated = async(req,res,next)=>{
try {
    const {token} = req.cookies
console.log(token)
if(!token) throw new Error("Invalid User")
let decode = await jwt.verify(token,SECRET_KEY)
req.user = decode.id

next()
} catch (error) {
    next(error)
}
}