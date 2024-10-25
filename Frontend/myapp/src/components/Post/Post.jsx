import React,{useContext} from "react";
import Comments from "../Coment/Comments";
import "./Post.css";
import UserContext from "../Context/UserContext";
const Post = ({ post }) => {
  const {user} = useContext(UserContext)

  return (
    <>
      <div
        key={post.key}
        className="card  bg-white border px-6   m-10  rounded-lg "
      >
        <div className="flex items-center px-6 py-2  justify-between profile-box">
          <div className="flex items-center">
            <a href="#">
              <img
                className="rounded-full mt-3  m-auto w-14 h-14 "
                src={user.image}
              />
            </a>
            <div className="flex flex-col ml-4">
              <h6 className="text-xs font-bold profile-name">{user.name}</h6>
              <span className="text-xs font-medium about-text">
                {user.email}
              </span>
            </div>
          </div>
          <div>
            <span className="date text-xs font-medium">{user.createdAt}</span>
          </div>
        </div>

        <div className="p-6">
          <a href="#">
            <h5 className="post-title mb-2">
              {post.title}
            </h5>
          </a>
          <div>
            <img src={post.image} className="post-image m-auto" alt="post-img" />
          </div>
        </div>
        {<Comments key={post.key} postId={post.id} />}
      </div>
    </>
  );
};

export default Post;
