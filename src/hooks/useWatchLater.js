import { useQuery } from "react-query"
import { toast } from "react-toastify"
import { getWatchLater } from "../api";


const useWatchLater = (uid)=>{
    const {data,isLoading,isError,refetch} = useQuery(
        "wishlist",
        async ()=>{
            try {
                const wishlist = await getWatchLater(uid);
                toast
                return wishlist;
            } catch (error) {
              toast.error(error);
            }
        },
        {refetchOnWindowFocus : false}
    );
    return {data,isLoading,isError,refetch}
}

export default useWatchLater;