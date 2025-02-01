import React, { useState,useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArchiveBox, CircleDashed, MagnifyingGlass, User } from "phosphor-react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ChatElement from "../../components/ChatElement";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/search";
import Friends from "../../sections/dashboard/Friends";
import {socket} from "../../socket";
import { useSelector } from "react-redux";
const Chats = () => {
  const [openDialog,setOpenDialog]=useState(false);

  const {user}=useSelector((state)=>state.profile);
  
  const user_id=user._id;
  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      console.log(data); // this data is the list of conversations
      // dispatch action

      // dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, []);
  const handleCloseDialog=()=>{
    setOpenDialog(false);
  }

  const handleOpenDialog=()=>{
    setOpenDialog(true);
  }
  const theme = useTheme();

  const {direct_chat}=useSelector((state)=>state.conversation);
  console.log(direct_chat);
  const conversations=direct_chat.conversations
  return (
    <>
      <Box
        sx={{
          position: "relative",
        
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f3e8fb"
              : theme.palette.background,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{  height: "100vh"}}>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Chat</Typography>
           <Stack direction="row" alignItems="center" spacing={1}>
           <IconButton onClick={()=>{
            handleOpenDialog();
           }}>
              <User />
            </IconButton>
            <IconButton>
              <CircleDashed />
            </IconButton>
           </Stack>
           
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709ce6" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search...." />
            </Search>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems={"center"} spacing={1.5}>
              {" "}
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack direction={"column"} sx={{flexGrow:1 , overflowY:"scroll" ,overflowX:"hidden", height:"100%"}}>
          <SimpleBarStyle timeout={50} clickOnTrack={false}>
            <Stack spacing={2.4}>
              {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {ChatList.filter((el) => el.pinned === true).map((el) => {
                return <ChatElement element={el} />;
              })} */}
            </Stack>

            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Chats
              </Typography>
              {conversations.filter((el) => !el.pinned === true).map((el) => {
                return <ChatElement element={el} />;
              })}
            </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
