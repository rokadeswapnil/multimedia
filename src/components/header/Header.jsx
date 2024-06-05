import React, { useState, useEffect } from "react";
import { HiOutlineSearch,HiLogout } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";


import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.png";
import useUser from "../../hooks/useUser";
import { PuffLoader } from "react-spinners";
import { AnimatePresence,motion } from "framer-motion";
import { auth } from "../../firebase/firebase.config";
import { useQueryClient } from "react-query";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenu,setIsMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError } = useUser();
  const queryClient = useQueryClient() 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    }
    else if(type ==="auth"){
      navigate("/auth")
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };
  const signOutUser = async()=>{
    await auth.signOut().then(()=>{
        queryClient.setQueryData("user", null)
    })
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div>
          {isLoading ? (
            <PuffLoader color="#FFFFFF" size={40} />
          ) : (
            <>
              {data ? (
                <div className="relative" onClick={()=>setIsMenu(!isMenu)}>
                  {data?.photoURL ? (
                    <div className="md:w-12 md:h-12 w-8 h-8 rounded-md relative flex items-center justify-center cursor-pointer">
                      <img
                        src={data?.photoURL}
                        className="w-full h-full object-cover rounded-md"
                        referrerPolicy="no-referrer"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-blue-500 cursor-pointer">
                      <p className="text-white text-lg">{data?.email[0]}</p>
                    </div>
                  )}
                  <AnimatePresence>
                  {isMenu && <motion.div
                  initial={{opacity:0,y:20}}
                  animate={{opacity:1,y:0}}
                  exit={{opacity:0,y:20}}
                   className="absolute w-64 flex justify-center items-center flex-col px-4 py-3 rounded-md md:top-14 md:right-10 top-16 -left-36 bg-white -z-10" onMouseLeave={()=>setIsMenu(false)}>
                  {data?.photoURL ? (
                    <div className="md:w-12 md:h-12 w-8 h-8 rounded-md relative flex flex-col items-center justify-center cursor-pointer">
                      <img
                        src={data?.photoURL}
                        className="w-full h-full object-cover rounded-md"
                        referrerPolicy="no-referrer"
                        alt=""
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-blue-500 cursor-pointer">
                      <p className="text-white text-lg">{data?.email[0]}</p>
                    </div>
                  )}
                   <p className=" text-sm font-medium ">{data?.displayName}</p>
                   {/* profile menu */}
                   <div className="w-full flex items-center justify-center flex-col gap-4 pt-6">
                    <Link to={`/profile/${data?.uid}`} className="w-full  text-sm hover:bg-gray-200 bg-gray-100 px-5 py-2 rounded-md">My Account</Link>
                    <Link to={"/watchlater"} className="w-full  text-sm hover:bg-gray-200 bg-gray-100 px-5 py-2 rounded-md">WatchList</Link>
                    <div className="w-full text-center text-sm hover:bg-gray-200 bg-gray-100 px-5 py-2 rounded-md flex justify-between items-center group" onClick={()=>signOutUser()}>
                        <p>SignOut</p>
                        <HiLogout/>
                    </div>
                   </div>
                   </motion.div>}
                   </AnimatePresence>
                </div>
    
              ) : (
                  <button className="text-white hover:text-purple-500 font-bold px-3 py-2 hover:bg-gray-100 bg-gray-400 rounded-md" onClick={() => navigationHandler("auth")}>Login</button>
              )}
            </>
          )}
        </div>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
