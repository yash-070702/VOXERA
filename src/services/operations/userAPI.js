import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import {updateUsers, updateFriends,updateFriendRequests,updateSendFriendRequests} from "../../Redux/slices/profile"
import { toast } from "react-hot-toast"
const {
    FETCH_USER_API,
    FETCH_FRIENDS_API,
    FETCH_FRIEND_REQUESTS_API,
    FETCH_SEND_FREIND_REQUESTS_API,
  } = endpoints;

 export const FetchUsers =(user)=>
 {   

 return async(dispatch)=> {
   let result=[]
   const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("POST", FETCH_USER_API,{
          user,
        } )
  
        console.log("FETCH_USER API RESPONSE............", response)
  
        if (!response?.data?.success) {
          throw new Error(response.data.message)
        }

        result=response?.data?.data;
        dispatch(updateUsers(response?.data?.data))
      } 
      catch (error) {
        console.log("FETCH_USER API ERROR............", error)
        toast.error("Failed to fetch User")
      }
      toast.dismiss(toastId)
     return result;
  }
}

 export const FetchFriends =(user)=>{
    
 return async(dispatch)=> {
    let result=[]
    const toastId = toast.loading("Loading...")
       try {
         const response = await apiConnector("POST", FETCH_FRIENDS_API,{user} )
   
         console.log("FETCH_FRIENDS API RESPONSE............", response)
   
         if (!response?.data?.success) {
           throw new Error(response.data.message)
         }
 
         result=response?.data?.data;
         console.log(response.data);
         dispatch(updateFriends(response?.data?.data))

         
       } 
       catch (error) {
         console.log("FETCH_FRIENDS API ERROR............", error)
         toast.error("Failed to get all friends")
       }
       toast.dismiss(toastId)
      return result;
   }
}

 export const FetchFriendRequests =(user)=>{
    return async(dispatch)=> {
    let result=[]
    const toastId = toast.loading("Loading...")
       try {
         const response = await apiConnector("POST", FETCH_FRIEND_REQUESTS_API,{user} )
   
         console.log("FRIEND_REQUEST API RESPONSE............", response)
   
         if (!response?.data?.success) {
           throw new Error(response.data.message)
         }
 
         result=response?.data?.data;
         console.log(response.data);
         dispatch( updateFriendRequests(response?.data?.data))
         
       } 
       catch (error) {
         console.log("FRIEND_REQUEST API ERROR............", error)
         toast.error("Failed to fetch friend requests")
       }
       toast.dismiss(toastId)
      return result;
   }
}

export const FetchSendRequests =(user)=>{
  return async(dispatch)=> {
  let result=[]
  const toastId = toast.loading("Loading...")
     try {
       const response = await apiConnector("POST", FETCH_SEND_FREIND_REQUESTS_API,{user} )
 
       console.log("SEND_FRIEND_REQUEST API RESPONSE............", response)
 
       if (!response?.data?.success) {
         throw new Error(response.data.message)
       }

       result=response?.data?.data;
       console.log(response.data.data);
      dispatch(updateSendFriendRequests(response?.data?.data))
       
     } 
     catch (error) {
       console.log("SEND_FRIEND_REQUEST API ERROR............", error)
       toast.error("Failed to fetch send requests")
     }
     toast.dismiss(toastId)
    return result;
 }
}