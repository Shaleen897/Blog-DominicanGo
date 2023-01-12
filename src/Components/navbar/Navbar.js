import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

// CSS
import './navbar.css';

import { useUserAuth } from "../../firebase/AuthContext";

const Navbar = ({ active, setActive, user, handleLogout }) => {

  const [click, setClick] = useState(false);
  const handleclick = () => { setClick(!click) }

  // const { user } = useUserAuth();
  const userId = user?.uid;

  return (
    <div className='w-full h-[60px] flex items-center justify-center navback'>
      <div className='container text-white'>
        <div className="ml-5 ">
          <h1 className='font-bold'>
            <Link to='/'>
              <span className='text-blue-500 text-[25px]'>DOMINICAN</span> <span className='text-[25px] text-red-600'>GO</span>
            </Link>
          </h1>
        </div>
        <div>
          <ul className={click ? 'nav-menu active' : 'nav-menu font-semibold'}>
            <Link to='/'><li className={`ml-7 hover:bg-[#9da1a771] py-2 px-4 rounded ${active === "/" ? "active" : ""}`} onClick={() => setActive("/")}>Home</li></Link>
            <Link to='/crear'><li className={`ml-7 hover:bg-[#9da1a771] py-2 px-4 rounded ${active === "crear" ? "active" : ""}`} onClick={() => setActive("crear")}>Crear</li></Link>
            <Link to='/info'><li className={`ml-7 hover:bg-[#9da1a771] py-2 px-4 rounded ${active === "info" ? "active" : ""}`} onClick={() => setActive("info")}>Info</li></Link>
            { userId ? <li className='ml-7 hover:bg-[#9da1a771] py-2 px-4 rounded logout'>{user?.displayName}</li> : ""}
            {userId ? <li className='ml-7 hover:bg-[#9da1a771] py-2 px-4 rounded logout'><Link to='/' className='logout' onClick={handleLogout}>Logout</Link></li> : <li className='ml-7 hover:bg-[#9da1a771] py-2 px-4 rounded logout'><Link to='/login' className='logout'>Log In</Link></li>}
           
          </ul>
        </div>
        <div className='rightnav'>
          {userId ? (
            <>
              <div className="flex items-center text-[20px]">
                <FaUserCircle></FaUserCircle>
              </div>
              <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                {user?.displayName}
              </p>
              <li className="hover:bg-red-600 py-3 px-4 rounded list-none cursor-pointer ml-5" onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <li
                className={`bg-indigo-600 hover:bg-indigo-500 py-3 px-4 rounded cursor-pointer list-none ${active === "login" ? "active" : ""
                  }`}
                onClick={() => setActive("login")}
              >
                Login
              </li>
            </Link>
          )}
        </div>
      </div>
      <div className='hamburger text-white cursor-pointer p-1 text-[30px]' onClick={handleclick}>
        {click ? (<AiOutlineCloseCircle />) : (<GiHamburgerMenu />)}
      </div>

    </div>
  )
}

export default Navbar