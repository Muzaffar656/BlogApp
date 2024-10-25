import React,{useContext,useEffect} from 'react'
import Post from '../Post/Post'
import UserContext from '../Context/UserContext'

const Posts = () => {
  const {getAllPost,post,} = useContext(UserContext)
    useEffect(()=>{
        getAllPost()
    },[])
  return (
    <div className='mt-10'>
        {
        

            post ? post.map((post)=>(<Post post={post} key={post.id}/>)) : <h1>No Post Here</h1>
          
        }
    </div>
  )
}

export default Posts