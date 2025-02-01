import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { socket, connectSocket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { selectConversation } from "../../Redux/slices/chat";
import { addDirectConversation,updateDirectConversation } from "../../Redux/slices/conversation";
const DashboardLayout = () => {
  const { user } = useSelector((state) => state.profile);
  const user_id = user?._id;
  const {direct_chat}=useSelector((state)=>state.conversation);
    console.log(direct_chat);
    const conversations=direct_chat.conversations;
const dispatch=useDispatch()
  useEffect(() => {
    if (user) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("start_chat", (data) => {
        console.log(data);
        // add / update to conversation list
        const existing_conversation = conversations.find(
          (el) => el?.id === data._id
        );
        if (existing_conversation) {
          // update direct conversation
          dispatch(updateDirectConversation({ conversation: data }));
        } else {
          // add direct conversation
          dispatch(addDirectConversation({ conversation: data }));
        }
        dispatch(selectConversation({ room_id: data._id }));
      });

      socket.on("new_friend_request", (data) => {
        toast.success("New Freind Request Recieved");
      });

      socket.on("request_accepted", (data) => {
        toast.success("Friend Request Accepted");
      });

      socket.on("request_sent", (data) => {
        toast.success("New friend request sent successfully");
      });
    }

    // Remove event listener on component unmount
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      // socket?.off("new_message");
      // socket?.off("audio_call_notification");
    };
  }, [user_id, socket]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
