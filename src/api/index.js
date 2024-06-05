import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebase.config"

export const    getUserDetail = ()=>{
    return new Promise((resolve,reject)=>{
        const unsubscribe = auth.onAuthStateChanged((userCred)=>{
            if(userCred){
                const userData = userCred.providerData[0]
                const unsubscribe = onSnapshot(doc(db,"users",userData?.uid),(_doc)=>{
                    if(_doc.exists())
                        {
                            resolve(_doc.data())
                        }
                        else{
                            setDoc(doc(db,"users",userData?.uid),userData).then(()=>{
                                resolve(userData);
                            })
                        } 
                })
                return unsubscribe;
            }
            else{
                reject(new Error("User is not authenticated"))
            }

//  make sure to unsubscibe from the listner
unsubscribe()

        })
    })
}

export const getWatchLater = (uid)=>{
    return new Promise((resolve,reject)=>{
        const watchLaterQuery = query(
            collection(db,"users",uid,"watchlater")
        )
        const unsubscibe = onSnapshot(watchLaterQuery,
            (querySnap)=>{
                const watchlater =querySnap.docs.map((doc)=>doc.data())
                resolve(watchlater)
            })
          
            return unsubscibe
    })
}