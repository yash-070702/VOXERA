import { createSlice } from "@reduxjs/toolkit";
// import { dispatch } from "../store";

const initialState = {
    user: {},
    sideBar: {
      open: false,
      type: "CONTACT", // can be CONTACT, STARRED, SHARED
    },
    // isLoggedIn: true,
    // tab: 0, // [0, 1, 2, 3]
    // snackbar: {
    //   open: null,
    //   severity: null,
    //   message: null,
    // },
    // users: [], // all users of app who are not friends and not requested yet
    // all_users: [],
    // friends: [], // all friends
    // friendRequests: [], // all friend requests
    // chat_type: null,
    // room_id: null,
    // call_logs: [],
  };

  const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
    //   fetchCallLogs(state, action) {
    //     state.call_logs = action.payload.call_logs;
    //   },
    //   fetchUser(state, action) {
    //     state.user = action.payload.user;
    //   },
    //   updateUser(state, action) {
    //     state.user = action.payload.user;
    //   },
      // Toggle Sidebar
      toggleSideBar(state) {
        state.sideBar.open = !state.sideBar.open;
      },
      updateSideBarType(state, action) {
        state.sideBar.type = action.payload.type;
      },
    //   updateTab(state, action) {
    //     state.tab = action.payload.tab;
    //   },
    },
    });
    export default slice.reducer;

    export function ToggleSidebar() {
        return async (dispatch) => {
          dispatch(slice.actions.toggleSideBar());
        };
      }
      export function UpdateSidebarType(type) {
        return async (dispatch) => {
          dispatch(slice.actions.updateSideBarType({ type }));
        };
      }