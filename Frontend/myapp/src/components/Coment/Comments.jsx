import React, { useContext, useEffect, useState } from "react";
import axios from "axios";


import like from '../../assets/like.svg'
import coment from "../../assets/coment.png";

import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newcoments, setNewcoments] = useState("");
  const [likes, setLikes] = useState("");
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (postId) {
      const getPostcomment = async (postId) => {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/api/v1/getpostcoment",
            { postId },
            {
              withCredentials: true,
            }
          );

          setComments(data);
        } catch (error) {
          console.log(error);
        }
      };
      const getPostLike = async (postId) => {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/countlike/${postId}`
          );
          setLikes(data.likecount);
        } catch (error) {
          console.log(error);
        }
      };
      const checkLike = async (postId) => {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/getpostlike/${postId}`,
            { withCredentials: true }
          );
          setLiked(data.liked);
        } catch (error) {
          console.log(error);
        }
      };
      checkLike(postId);
      getPostLike(postId);
      getPostcomment(postId);
    }
  }, [postId]);
  const handelSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `http://localhost:4000/api/v1/addcomment/${postId}`,
      { comment: newcoments },
      { withCredentials: true }
    );

    setComments([...comments, data.newComment]);
    setNewcoments("");
  };

  const handleLike = async () => {
    setLiked(!liked);
    if (liked) {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/unlike/${postId}`,
        { withCredentials: true }
      );
      setLiked(false);
      setLikes((prevCount) => prevCount - 1);
    } else {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/addlike/${postId}`,
        {},
        { withCredentials: true }
      );
      setLiked(true);
      setLikes((prevCount) => prevCount + 1);
    }
  };
  const handelcoment = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900   antialiased  px-3">
      <div className="max-w-2xl mx-auto px-3">
        <div className="flex justify-between items-center mb-6">
          <button onClick={handleLike} className="text-2xl flex items-center">
            {liked ? <AiFillLike /> : <AiOutlineLike />}{" "}
            <span className="text-xs ml-4">{likes}</span>
          </button>

          <button onClick={handelcoment} className="text-2xl">
            <BsChatText />
          </button>
        </div>

        <div>
          {open ? (
            <form className="mb-6 " onSubmit={handelSubmit}>
              <input
                onChange={(e) => setNewcoments(e.target.value)}
                className="py-2 px-4 w-full text-sm bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment... "
                required
              />

              <button
                type="submit"
                className="mt-4 inline-flexv mr-8 items-center py-2.5 px-4 text-xs font-medium text-white bg-black rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
              >
                Post comment
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
        {/* Comment Section */}
        <div className="space-y-6 ">
          {comments ? (
            comments.map((item, index) => (
              <article
                key={index}
                className=" bg-white dark:bg-gray-900 rounded-lg "
              >
                <header className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                      alt="Michael Gough"
                      className=" h-6 rounded-full"
                    />
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.comment}
                    </p>
                    {/* <time dateTime="2022-02-08" className="text-sm text-gray-600 dark:text-gray-400">{}</time> */}
                  </div>
                </header>
                {/* <p className="text-gray-500 dark:text-gray-400"></p> */}
              </article>
            ))
          ) : (
            <h1>0 Coment</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Comments;
