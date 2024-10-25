import React, { useContext } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../Context/UserContext";


const Navbar = ({ user }) => {
  const navigate = useNavigate()
  const {handelLogout} = useContext(UserContext)
const logout = async()=>{
  handelLogout()
  navigate('/login')
}

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to={"/"}>
                <img
                  alt="Your Company"
                  src={`https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500`}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <ul className="flex space-x-4 text-white items-center ml-5">
              <Link to={"/"}>
                <li>Home</li>
              </Link>
        {
          user ?       (<Link to={"/createpost"}>
                <li>CreatePost</li>
              </Link>) : ""
        }
              {

          user ?  (  <Link to={"/userpost"}>
                <li>MyPost</li>
              </Link>) : ""
              }
              {

user ?  (  <Link to={"/profile"}>
      <li>Profile</li>
    </Link>) : ""
    }



            </ul>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3 flex items-center">
         
         {
          user ? (
            <button onClick={logout} className=" font-medium block px-4 py-2 text-sm text-gray-70 bg-white rounded-md mr-8">
                        Sign out
                      </button>
          ) : (
      <>
      <Link
                        to={"/login"}
                        className="font-medium block px-4 py-2 text-sm text-gray-70 bg-white rounded-md"
                      >
                        Login
                      </Link>
                      <Link
                        to={"/register"}
                        className="font-medium block px-4 py-2 text-sm text-gray-70 bg-white rounded-md ml-8" 
                      >
                        Register
                      </Link>
      </>
          )
         }
            

     
                 

            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
