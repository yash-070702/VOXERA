import React, { useEffect } from "react";
import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FetchFriendRequests ,FetchFriends,FetchSendRequests,FetchUsers } from "../../services/operations/userAPI";
import { FriendElement, FriendRequestElement, UserElement } from "../../components/Friends";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const UsersList = () => {
  const dispatch = useDispatch();
const {users}=useSelector((state)=>state.profile);
  const {user} = useSelector((state) => state.profile);

  useEffect(() => {
  dispatch(FetchUsers(user));
  dispatch(FetchSendRequests(user));
  }, []);

  return (
    <>
      {users.map((el, idx) => {
        return <UserElement key={el._id}{...el}/>
      })}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile);
  const { friends } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(FetchFriends(user));
  }, []);

  return (
    <>
    
      {friends.length===0?<div className=" text-center font-bold text-[1.2rem]">You are having 0 Friends</div>:friends.map((el, idx) => {
        return <FriendElement key={idx} {...el} />
      })}
    </>
  );
};

const RequestsList = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile);
  const { friendRequests } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(FetchFriendRequests(user));
  }, []);

  return (
    <>
      {friendRequests.length===0?<div className=" text-center font-bold text-[1.2rem]">You are having 0 Friend Requests</div>:friendRequests.map((el, idx) => {
        return <FriendRequestElement key={idx} {...el.sender} id={el._id}  />
      })}
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      // TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      {/* <DialogTitle>{"Friends"}</DialogTitle> */}
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
           <Stack spacing={2.4}>
            {(() => {
              switch (value) {
                case 0: // display all users in this list
                  return <UsersList />;

                case 1: // display friends in this list
                  return <FriendsList />;

                case 2: // display request in this list
                  return <RequestsList />;

                default:
                  break;
              }
            })()} 
           </Stack> 
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;