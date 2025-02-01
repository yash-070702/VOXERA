import React from "react";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";

import { Box, Stack, TextField } from "@mui/material";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MutliInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

const ChatInput = ({}) => {
  return (
    <StyledInput
      fullWidth
      placeholder="Write a Message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
};
const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f4ecff"
            : theme.palette.background.default,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <Stack width={"100%"} direction={"row"} alignItems={"center"} gap={2}>
          <Box
            sx={{
              zIndex: 10,
              display: openPicker ? "inline" : "none",
              position: "fixed",
              bottom: 81,
              left: 430,
            }}
          >
            <EmojiPicker theme={theme.palette.mode} />
          </Box>

          <Stack sx={{ width: "max-content" }}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {Actions.map((el) => (
                <Tooltip placement="right" title={el.title}>
                  <Fab
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                    aria-label="add"
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <IconButton>
              <LinkSimple
                onClick={() => {
                  setOpenActions(!openActions);
                }}
              />
            </IconButton>
          </Stack>

          <IconButton>
            <Smiley
              onClick={() => {
                setOpenPicker(!openPicker);
              }}
            />
          </IconButton>
          <ChatInput setOpenPicker={setOpenPicker} openPicker={openPicker} />
        </Stack>

        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton>
              <PaperPlaneTilt />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
