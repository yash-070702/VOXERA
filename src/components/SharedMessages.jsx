import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack, Typography, Grid } from "@mui/material";
import { Shared_docs, Shared_links } from "../data";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ToggleSidebar } from "../Redux/slices/app";
import { ArrowLeft, X } from "phosphor-react";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../Redux/slices/app";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { DocMsg, LinkMsg } from "./Conversation/MsgTypes";
const SharedMessages = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <Stack direction="row" spacing={3} alignItems={"center"}>
              <IconButton
                onClick={() => {
                  dispatch(UpdateSidebarType("CONTACT"));
                }}
              >
                <ArrowLeft />
              </IconButton>
              <Typography variant="subtitle2">Shared</Typography>
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

        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
          }}
          spacing={3}
          padding={value === 1 ? 1 : 3}
        >
          {/* <Conversation starred={true} /> */}
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6].map((el) => (
                      <Grid item xs={4}>
                        <img
                          src={faker.image.city()}
                          alt={faker.internet.userName()}
                        />
                      </Grid>
                    ))}
                  </Grid>
                );
              case 1:
                return Shared_links.map((el) => <LinkMsg el={el} />);

              case 2:
                return Shared_docs.map((el) => <DocMsg el={el} />);

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
