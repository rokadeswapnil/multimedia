
import React, { useEffect } from "react";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import MainSpinner from "../../components/mainspinner/MainSpinner";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Authentication = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  const { data, isLoading, isError } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/",{replace:true})
       
  }}, [isLoading,data]);

  const handleClick = async () => {
    await signInWithRedirect(auth, googleAuthProvider);
  };

  if (isLoading) {
    return <MainSpinner />;
  }

  return (
    <>
    <Header/>
      <div className="w-full h-screen py-3 flex justify-center items-center flex-col bg-[#173661]">
        <div className="w-full flex items-center justify-center flex-col gap-1 h-1/3 dark:bg-[#173661]">
          <span className="md:text-[100px] text-[50px]  text-center text-purple-500 font-bold ">Welcome.</span>
          <span className="text-lg text-center text-white">
            Millions of movies, TV shows and people to discover. Explore now!
          </span>
          <button
            className="px-4 py-2 border flex justify-center items-center gap-2 border-white dark:border-white rounded-lg text-white dark:text-white hover:text-slate-400 hover:shadow transition duration-150"
            onClick={handleClick}
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Authentication;

