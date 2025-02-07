import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
const user_id=user?._id;

const initialState = {
    direct_chat: {
      conversations: [],
      current_conversation: null,
      current_messages: [],
    },
    group_chat: {},
  };

  const conversationSlice =createSlice({
      name:"conversation",
      initialState:initialState,
      reducers:{

         fetchDirectConversations(state,action){
            const list = action.payload.conversations.map((el) => {
                const user = el.participants.find(
                  (elm) => elm._id.toString() !== user_id
                );
                return {
                    id: el._id,
                    user_id: user?._id,
                    name: `${user?.firstName} ${user?.lastName}`,
                    online: user?.status === "Online",
                    img: faker.image.avatar(),
                    msg: faker.music.songName(), 
                    time: "9:36",
                    unread: 0,
                    pinned: false,
                    // about: user?.about,
                  };
            });
         },


         updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (el) => {
          if (el?.id !== this_conversation._id) {
            return el;
          } else {
            const user = this_conversation.participants.find(
              (elm) => elm._id.toString() !== user_id
            );
            return {
              id: this_conversation._id._id,
              user_id: user?._id,
              name: `${user?.firstName} ${user?.lastName}`,
              online: user?.status === "Online",
              img: faker.image.avatar(),
              msg: faker.music.songName(),
              time: "9:36",
              unread: 0,
              pinned: false,
            };
          }
        }
      );
    },
    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      state.direct_chat.conversations = state.direct_chat.conversations.filter(
        (el) => el?.id !== this_conversation._id
      );
      state.direct_chat.conversations.push({
        id: this_conversation._id._id,
        user_id: user?._id,
        name: `${user?.firstName} ${user?.lastName}`,
        online: user?.status === "Online",
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: false,
      });
    },
    
  }});
  export const {fetchDirectConversations,addDirectConversation,updateDirectConversation}=conversationSlice.actions;
  export default conversationSlice.reducer;