import React from "react";
import Chats from "./Chats";
import { Link } from "react-router-dom";
import { Stack,Typography } from "@mui/material";
import Box from "@mui/material/Box";
import NoChat from "../../assets/Illustration/NoChat";
import { useTheme } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
const GeneralApp = () => {
  const theme = useTheme();
  const app = useSelector((state) => state.app);
  const {room_id,chat_type}=useSelector((state)=>state.chat);
  console.log(app.sideBar);
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: app.sideBar.open
            ? `calc(100vw - 740px )`
            : "calc(100vw - 420px )",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f0f8ff"
              : theme.palette.background.paper,
          // borderBottom:
          //   searchParams.get("type") === "individual-chat" &&
          //   searchParams.get("id")
          //     ? "0px"
          //     : "6px solid #0162C4",
        }}
      >
    {room_id!==null && chat_type==="individual" ? <Conversation/>:
      <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              <NoChat />
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>
    }
        
      </Box>

      {app.sideBar.open &&   (() => {
            switch (app.sideBar.type) {
              case "CONTACT":
                return <Contact />;

              case "STARRED":
                return <StarredMessages/>
             

              case "SHARED":
                return <SharedMessages/>

              default:
                break;
            }
          })()}
    </Stack>
  );
};

export default GeneralApp;
