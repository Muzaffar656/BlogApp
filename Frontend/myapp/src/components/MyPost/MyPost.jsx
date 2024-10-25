import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyPost = () => {
  const [data,setData] = useState()
  useEffect(()=>{
    try {
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:4000/api/v1/getuserpost',{withCredentials:true})
        if(data.success === false){
            return <h1>User Dont Have post</h1>
        }else{
            setData(data.post)
        }
        
     
      }
      
      fetch()
    } catch (error) {
      console.log(error.response.data.message)
    }
  },[])
  return (
    <div className=' w-4/5 m-auto mt-10 grid grid-cols-3 '>
      
{
data ? data.map((item,index)=>(
  <div key={index} className="max-w-sm bg-white border text-center m-10 border-gray-200 rounded-lg shadow dark:bg-gray-800 flex flex-col  dark:border-gray-700">
  <a href="#">
    <img className="rounded-t-lg mt-3 h-40 m-auto " src={item.image}   />
  </a>
  <div className="p-5">
    <a href="#">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
    </a>
  
  </div>
</div>
)) : <h1>Youser Dont Have post</h1>
}



    </div>
  )
}

export default MyPost