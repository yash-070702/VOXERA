import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowLeft, X } from "phosphor-react";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../Redux/slices/app";
import Message from "./Conversation/Message";
import { ToggleSidebar } from "../Redux/slices/app";
const StarredMessages = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Box sx={{ width: 320, maxHeight: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
              ? "#f0f8ff"
              : theme.palette.background.paper,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            
            <Stack
              sx={{ height: "100%"}}
              direction="row"
              alignItems={"center"}
              spacing={3}
            >
              <IconButton
                onClick={() => {
                  dispatch(UpdateSidebarType("CONTACT"));
                }}
              >
                <ArrowLeft />
              </IconButton>
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
          }}
          spacing={3}
        >
          <Message />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
