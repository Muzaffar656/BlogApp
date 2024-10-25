import { Children, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [post,setPost] = useState(null)
    const [comments,setComments] = useState(null)

   
        const getUser = async()=>{
         try { 
            const {data} = await axios.get('http://localhost:4000/api/v1/me',{withCredentials:true})
            
            setUser(data.user)
           
         } catch (error) {
            console.log("Error")
         }
        }
        const handelLogout = async()=>{
           try {
            const {data} = await axios.get('http://localhost:4000/api/v1/logout',{withCredentials:true})
            setUser(null)
           } catch (error) {
            console.log(error)
           }
          }
       
          const handelSubmit = async (email,password)=>{
            try {
           
              let myform = new FormData()
              myform.append('email',email)
              myform.append('password',password)
              const {data} = await axios.post('http://localhost:4000/api/v1/login',myform,
                {
                  headers:{
                    'Content-Type':"multipart/form-data"
                  },
                  withCredentials:true
                }
              )
              setUser(data.user)
           
          
            } catch (error) {
              console.log(error)
            }
          }
          const handelRegister = async (name,email,password,image)=>{
            try {
          
              let myform = new FormData()
              myform.append('name',name)
              myform.append('email',email)
              myform.append('password',password)
              myform.append('file',image)
              const {data} = await axios.post('http://localhost:4000/api/v1/register',myform,
                {
                  headers:{
                    'Content-Type':"multipart/form-data"
                  },
                  withCredentials:true
                  
                }
              )
              setUser(data.user)
           
       
            } catch (error) {
             
              console.log(error.response.data.message)
            }
          }

          const createpost = async (title,image)=>{
            try {
             
              let myform = new FormData()
              myform.append('title',title)
    
              myform.append('file',image)
              const {data} = await axios.post('http://localhost:4000/api/v1/createpost',myform,
                {
                  headers:{
                    'Content-Type':"multipart/form-data"
                  },
                  withCredentials:true
                  
                }
              )
              console.log(data.message)
      
            } catch (error) {
              alert(error.response.data.message)
            }
          }
          const getAllPost = async()=>{
            try {
        
                const {data} = await axios.get('http://localhost:4000/api/v1/getallpost',{withCredentials:true})
                setPost(data.post)

            } catch (error) {
              console.log(error.response.data.message + "Error")
            }
          }

          const getallcomment = async()=>{
            try {
              const {data} = await axios.get("http://localhost:4000/api/v1/getallcomment",)
              setComments(data.coments)
            } catch (error) {
              console.log(error)
            }
          }
          
          // const getPostcomment = async(postId)=>{
          //   try {
          //     const {data} = await axios.post("http://localhost:4000/api/v1/getpostcoment",{postId},{
          //      withCredentials:true
          //     })
          //     console.log(data) 
          //     setComments(data)
          //   } catch (error) {
          //     console.log(error)
          //   }
          // }
          
          
    return(
        <UserContext.Provider value={{user,setUser,getUser,handelLogout,handelSubmit,handelRegister,createpost,getAllPost,post,getallcomment,comments}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider