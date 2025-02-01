import React from 'react'
import {
    Box,
    Stack,
    Typography,
    Divider,
    Badge,
  } from "@mui/material";
  import {
    CaretDown,
    MagnifyingGlass,
    Phone,
    VideoCamera,
  } from "phosphor-react";
  import { styled, useTheme } from "@mui/material/styles";
  import IconButton from "@mui/material/IconButton";
  import Avatar from "@mui/material/Avatar";
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../Redux/slices/app';
import { useDispatch } from 'react-redux';

const Header = () => {
    const theme=useTheme();
    const dispatch=useDispatch(); 
  return (
    <Box
    p={3}
    sx={{
      height: 100,
      width: "100%",
      backgroundColor:theme.palette.mode === "light"
            ? "#f4ecff"
            : theme.palette.background.default,
      boxShadow: "0px 0px 2px rgba(0,0,0,0.25",
    }}
  >
    <Stack
      alignItems={"center"}
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Stack direction={"row"} spacing={2}  onClick={()=>{
        dispatch(ToggleSidebar())
      }}>
        <Box>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar />
          </StyledBadge>
        </Box>
        <Stack spacing={0.2}>
          <Typography variant="subtitle2">Yash Aggarwal</Typography>
          <Typography variant="caption">Online</Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <IconButton>
          <VideoCamera />
        </IconButton>
        <IconButton>
          <Phone />
        </IconButton>
        <IconButton>
          <MagnifyingGlass />
        </IconButton>
        <Divider orientation="vertical" flexItem="true" />
        <IconButton>
          <CaretDown />
        </IconButton>
      </Stack>
    </Stack>
  </Box>
  )
}

export default Header
