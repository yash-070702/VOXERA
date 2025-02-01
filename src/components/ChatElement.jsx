import React from "react";
import { Avatar, Box, Badge, Stack } from "@mui/material";
import { styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { selectConversation } from "../Redux/slices/chat";

// const StyledChatBox = styled(Box)(({ theme }) => ({
//   "&:hover": {
//     cursor: "pointer",
//   },
// }));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const ChatElement = ({ element }) => {
  const theme=useTheme();
  const dispatch=useDispatch();
  return (
    <Box
    onClick={()=>{
      dispatch(selectConversation(element.id))
    }}
      sx={{
        width: "90%",
        height: 70,
        borderRadius: 1,
        backgroundColor:theme.palette.mode === "light" ? "#fff" : theme.palette.background.default
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {element.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar />
            </StyledBadge>
          ) : (
            <Avatar />
          )}

          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{element.name}</Typography>
            <Typography variant="caption"> {element.msg.slice(0, 20)}
            {element.msg.length > 20 ? '...' : ''}</Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {element.time}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={element.unread}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
