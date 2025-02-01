import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat_type: null,
  room_id: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload;
    },
  },
});
export const {selectConversation}=chatSlice.actions;
export default chatSlice.reducer;
