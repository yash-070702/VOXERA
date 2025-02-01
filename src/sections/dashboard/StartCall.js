import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/search";
import { MagnifyingGlass } from "phosphor-react";
import { CallList, MemberList } from "../../data";
import { useDispatch, useSelector } from "react-redux";
// import { FetchAllUsers } from "../../redux/slices/app";
import { faker } from "@faker-js/faker";
import { CallElement } from "../../components/CallElement";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  //   const {all_users} = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(FetchAllUsers());
  }, []);

  //   console.log(CallList, all_users, "Call List Info");

  //   const list = all_users.map((el) => ({
  //     id: el?._id,
  //     name: `${el?.firstName} ${el?.lastName}`,
  //     image: faker.image.avatar(),
  //   }));

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
      PaperProps={{
        sx: {
          backgroundColor: "#f2faff", // Change the background color here
        },
      }}
    >
      <DialogTitle>{"Start New Conversation"}</DialogTitle>
      <Stack p={1} sx={{ width: "90%", alignSelf: "center" }}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}>
            {MemberList.map((el, idx) => {
              return (
                <CallElement key={idx} {...el} handleClose={handleClose} />
              );
            })}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
