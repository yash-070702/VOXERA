import {createSlice} from "@reduxjs/toolkit";


const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    loading:false,
    users: [], // all users of app who are not friends and not requested yet
  // all_users: [],
  friends: [], // all friends
friendRequests: [],// all friend requests
sendFriendRequests:[],
}

const profileSlice =createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
          },
          updateUsers(state, action) {
            state.users = action.payload;
          },
          // updateAllUsers(state, action) {
          //   state.all_users = action.payload;
          // },
          updateFriends(state, action) {
            state.friends = action.payload;
    },
    updateFriendRequests(state, action) {
        state.friendRequests = action.payload;
      },
      updateSendFriendRequests(state, action) {
        state.sendFriendRequests = action.payload;
      },
    
}});
export const {setUser,setLoading,updateUsers,updateAllUsers,updateFriends,updateSendFriendRequests,updateFriendRequests}=profileSlice.actions;
export default profileSlice.reducer;