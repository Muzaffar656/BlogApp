import React,{useContext,useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePost from './components/CreatePost/CreatePost'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Navbar from './components/Navbar/Navbar'
import Register from './components/Auth/Register/Register'
import Login from './components/Auth/Login/Login'
import MyPost from './components/MyPost/MyPost'
import Comments from './components/Coment/Comments'
import './App.css'
import UserContext from './components/Context/UserContext'
const App = () => {
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
    <Navbar user={user} />
    <Routes>
      <Route path="/" element={user ?<Home />:<Register/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/createpost" element={<CreatePost />} />

      <Route path="/profile" element={<Profile user={user} />} />
      <Route path="/userpost" element={<MyPost />} />
      <Route path="/comments" element={<Comments />} />
    </Routes>
  </Router>
  )
}

export default App