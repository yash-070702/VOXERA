import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import Logo from "../../assets/Images/logo.ico";
const MainLayout = () => {
  return (
    <>
      <Container sx={{}} maxWidth="sm">
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%", pt: 5 }}
            direction="column"
            alignItems={"center"}
          >
            <img style={{ height: 120, width: 120 }} src={Logo} alt="Logo" />
          </Stack>
          <Outlet />
        </Stack>
      </Container>
    </>
  );
};

export default MainLayout;
