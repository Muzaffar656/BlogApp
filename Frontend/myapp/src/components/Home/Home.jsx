import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../Context/UserContext'
// import Comments from './Comments'
import Comments from '../Coment/Comments'

import Posts from '../Posts/Posts'
const Home = () => {
  const [data,setData] = useState()
  const {getAllPost,post,getallcomment,comments} = useContext(UserContext)

  useEffect(()=>{
    getAllPost()
  getallcomment()
  },[])
  return (
    <div className='flex justify-center items-center'>

    <Posts/>
    </div>
  )
}

export default Home