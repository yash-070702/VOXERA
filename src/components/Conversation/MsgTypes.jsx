import React from "react";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { DotsThreeVertical, DownloadSimple } from "phosphor-react";
import {Image} from "phosphor-react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Message_options} from "../../data/index"
import { useState } from "react";
const MessageOptions=()=>{
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return(
    <>
    <DotsThreeVertical size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
    />

 <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem 
             onClick={handleClose}
            >{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  )
}
const TextMsg = ({ el,menu}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={"center"} justifyContent={el.incoming ? "start" : "end"}>
   {!el.incoming && menu &&   <MessageOptions/>}
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : "#fff"}
        >
          {el.message}
        </Typography>
      </Box>
     {el.incoming && menu &&  <MessageOptions/>}
    </Stack>
  );
};



const Timeline = ({ el }) => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Divider width="46%" />
        <Typography variant="caption" sx={{ color: theme.palette.text }}>
          {el.text}
        </Typography>
        <Divider width="46%" />
      </Stack>
    </>
  );
};

const MediaMsg = ({ el,menu }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={"center"} justifyContent={el.incoming ? "start" : "end"}>
         {!el.incoming && menu &&   <MessageOptions/>}
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ?theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {el.incoming && menu &&  <MessageOptions/>}
    </Stack>
  );
};

const ReplyMsg = ({ el,menu }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={"center"} justifyContent={el.incoming ? "start" : "end"}>
          {!el.incoming && menu &&   <MessageOptions/>}
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.paper
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor:theme.palette.background.paper,

              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      {el.incoming && menu &&  <MessageOptions/>}
    </Stack>
  );
};

const LinkMsg = ({ el,menu}) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={"center"} justifyContent={el.incoming ? "start" : "end"}>
      {!el.incoming && menu &&   <MessageOptions/>}
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ?theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="start"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
          <img src={el.preview} alt={el.message} style={{maxHeight:210,borderRadius:"10px"}} />
            <Stack direction={"column"} spacing={2}>
            <Typography
            variant="subtitile2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >Creating Chat App
          </Typography>
          <Typography
            variant="subtitile2"
            sx={{color:theme.palette.primary.main}}
            component={Link}
            to="//https://www.youtube.com"
          >www.youtube.com
          </Typography>
            </Stack>
            <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >{el.message}
          </Typography>
          </Stack>
         
        </Stack>
      </Box>
      {el.incoming && menu &&  <MessageOptions/>}
    </Stack>

  );
};

const DocMsg = ({ el,menu }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems={"center"} justifyContent={el.incoming ? "start" : "end"}>
          {!el.incoming && menu &&   <MessageOptions/>}
      <Box
        px={1.5}
        py={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {el.incoming && menu &&  <MessageOptions/>}
    </Stack>
  );
};
export {Timeline,TextMsg,MediaMsg, ReplyMsg,LinkMsg,DocMsg,MessageOptions};
