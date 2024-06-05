import React from "react";
import useUser from "../../hooks/useUser";
import { AnimatePresence } from "framer-motion";
import useWatchLater from "../../hooks/useWatchLater";
import { PuffLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase.config";
import Carousel from "../../components/carousel/Carousel";
import { motion } from "framer-motion";
import Img from "../../components/lazyLoadImage/Img";
import "./style.scss";
import WishList from "../wishlist/WishList";
import coverwrap from "../../assets/coverWrap.png";
import coverpic from "../../assets/coverpic.jpg";

const UserProfile = () => {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const {
    data: watchlater,
    isError: watchLaterisError,
    isLoading: watchLaterisLoading,
    refetch: watchLaterrefetch,
  } = useWatchLater(user.uid);
  const removeWishList = async (id) => {
    await deleteDoc(doc(db, "users", user?.uid, "watchlater", id)).then(() => {
      toast.success("Remove From Watch List");
      watchLaterrefetch();
    });
  };

  return (
    <>
      <div className="w-screen pt-[60px]  flex justify-center items-center flex-col">
        <motion.div
          className={`w-full h-96 bg-red-900 -z-10 flex justify-end items-center overflow-hidden`}
        >
          <div className="w-full flex items-center gap-1 ml-10 h-full text-[5vw] font-bold text-white/70">
            {user?.displayName.split("").map((items, index) => (
              <motion.p
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.3, y: 100 }}
                transition={{
                  delay: index * 0.2,
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  restDelta: 0.001,
                }}
                className=""
                key={index}
              >
                <motion.span
                  className=""
                  transition={{
                    delay: index * 0.2,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                    restDelta: 0.001,
                  }}
                >
                  {items}
                </motion.span>
              </motion.p>
            ))}
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
            src={coverwrap}
            alt=""
            className="object-cover h-96"
          />
        </motion.div>
        <div className=" w-full flex flex-col justify-center items-center gap-4">
          {user?.photoURL ? (
            <>
              <img
                className="w-32 h-32 rounded-full -mt-12 border-2"
                src={user.photoURL}
                alt="user"
              />
            </>
          ) : (
            <>
              <img
                className="w-32 h-32 rounded-full -mt-12 border-2"
                src="https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                alt="user"
              />
            </>
          )}
          <p className="text-4xl text-white">{user?.displayName}</p>
        </div>
        {/* tabs */}
        <div className="flex justify-center items-center mt-12">
          <div className="px-4 rounded-md flex items-center justify-center gap-2 group cursor-pointer">
            <Link to={"/watchlater"}>
              <p className="px-4 text-base font-bold bg-sky-500 group-hover:text-white py-1 rounded-md ">
                Wishlist
              </p>
            </Link>
          </div>
        </div>

        {/* cards */}
      </div>
      <WishList />
    </>
  );
};

export default UserProfile;
