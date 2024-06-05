import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { PuffLoader } from 'react-spinners'
import useUser from '../../hooks/useUser';
import useWatchLater from '../../hooks/useWatchLater';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import { toast } from 'react-toastify';

const WishList = () => {
    const navigate = useNavigate();
    const {data: user} = useUser();
  const {data:watchlater,isError : watchLaterisError,isLoading : watchLaterisLoading,refetch : watchLaterrefetch} = useWatchLater(user.uid);
  const removeWishList = async (id)=>{
    await deleteDoc(doc(db, "users", user?.uid, "watchlater", id)).then(() => {
      toast.success("Remove From Watch List");
      watchLaterrefetch();
  })
  }
  return (
    <section className='w-full py-11'>
    <div className=' w-full flex gap-8 flex-wrap items-center justify-center px-4 py-6'>
        <AnimatePresence>
          {watchLaterisLoading?(
          <>
          <div className='w-full  flex items-center justify-center '>
          <PuffLoader color="#FFFFFF" size={40} />
          </div>
          </>):(
          <>
          {watchlater && watchlater.length>0 ?
           <>
           {watchlater?.map(item=>(
          
    <div key={item?.id} className="relative w-64 h-96 rounded-lg overflow-hidden shadow-lg">

    <img src={item?.image} alt="Movie Background" className="absolute inset-0 w-full h-full object-cover"/>
   
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    <div className="relative p-4 flex flex-col h-full justify-between">
       
        <h2 className="text-white text-2xl font-bold">{item?.title}</h2>
       
        <div className="flex justify-between items-center">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"   onClick={() =>
                                        navigate(
                                            `/${item.mediatype}/${
                                                item.id
                                            }`
                                        )
                                    }>
                Play Now
            </button>
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300" onClick={()=>removeWishList(item.id)}>
                Delete
            </button>
        </div>
    </div>
</div>
           ))}
          </> :
          <>
          <div className='w-full h-80 flex items-center justify-center '>
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW9jeGZwcnRwbzV6NWs2cnc1bWYydTEzYzlwbDZrc212aHEwNWtjaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/C21GGDOpKT6Z4VuXyn/giphy.gif" alt="" className='w-56 h-56 object-cover' />
          </div>
          </>}
          </>)}
        </AnimatePresence>
      </div>
      </section>
  )
}

export default WishList
