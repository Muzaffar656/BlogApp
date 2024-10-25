import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import UserContext from "../Context/UserContext";


const Profile = ({user}) => {

  const [comments,setComments] = useState(null)
//   useEffect(()=>{
//     const getPostcomment = async(postId)=>{
//       try {
//         const {data} = await axios.post("http://localhost:4000/api/v1/getpostcoment",{postId},{
//          withCredentials:true
//         })
//         console.log(data) 
//         setComments(data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getPostcomment(postId)
//   },[postId])
  return (
    

<div className=" w-4/5 m-auto  bg-white border flex justify-center text-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
 
  <div className="flex flex-col items-center pb-10  p-20 m-auto">
 {
  user ?( <>    <img style={{height:'185px',width:"185px"}} className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.image?user.image:`https://www.w3schools.com/w3images/avatar2.png`} alt="Bonnie image" />
  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">User Name : {user.name}</h5></>) : (<h1>User Not Logged In....</h1>)
 }


  </div>
</div>


  )
}

export default Profile