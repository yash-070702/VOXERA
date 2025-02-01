import React from "react";
import { Box, useTheme, Stack, IconButton, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Nav_Buttons } from "../../data/index";
import Logo from "../../assets/Images/logo.ico";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import { useState } from "react";
import AntSwitch from "../../components/AntSwitch";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Profile_Menu } from "../../data/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/operations/authAPI";
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const getPath = (index) => {
    switch (index) {
      case 0:
        return "/app";

      case 1:
        return "/group";

      case 2:
        return "/call";

      case 3:
        return "/settings";

      default:
        break;
    }
  };

  const getMenuPath=(index)=>{
    switch (index) {
      case 0:
        return "/profile";
  
      case 1:
        return "/settings";
  
      case 2:
        return "/auth/login";
  
     
  
      default:
        break;
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
   
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeTab = (index) => {
    // dispatch(UpdateTab({ tab: index }));
    navigate(getPath(index));
  };
  const theme = useTheme();
  const { onToggleMode } = useSettings();
  const [selected, setSelected] = useState(0);
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        height: "100vh",
        width: 100,
      }}
    >
      <Stack
        direction="column"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ height: "100%" }}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              height: 64,
              width: 64,
              borderRadius: 1.5,
              backgroundColor: theme.palette.primary.main,
            }}
            p={1}
          >
            <img src={Logo} alt="Tawk" />
          </Box>

          <Stack
            direction="column"
            alignItems={"center"}
            sx={{ width: "max-content" }}
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      setSelected(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(el.index);
                    handleChangeTab(el.index);
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              )
            )}

            <Divider sx={{ width: 48 }} />

            {selected === 3 ? (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
                p={1}
              >
                <IconButton sx={{ width: "max-content", color: "#ffffff" }}>
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  handleChangeTab(3);

                  setSelected(3);
                }}
                sx={{ width: "max-content", color: "#000" }}
              >
                {" "}
                <Gear />{" "}
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack spacing={4} justifyContent={"center"}>
          <AntSwitch onChange={() => onToggleMode()} defaultChecked />
          <Avatar
            src={faker.image.avatar()}
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
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx) => (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    
                   
                  }}
                >
                  <Stack
                    sx={{ width: 100 }}
                    direction={"row"}
                    alignitems={"center"}
                    justifyContent={"space-between"}
                    onClick={()=>{
                      
                      if(idx===2){
                      dispatch(logout(navigate));
                    }
                     else{
                      navigate(getMenuPath(idx))
                    }}
                    }
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
