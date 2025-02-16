import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt, faBell, faEnvelope, faLandmark} from "@fortawesome/free-solid-svg-icons";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";

const Header = ({openSideBar, toggleSideBar}) => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#235172", padding: "0", zIndex: 10 }}>
        <Toolbar>
          {/* Left side: Burger menu and Building icon */}
          <IconButton edge="start" color="inherit" sx={{ marginLeft: 0, marginRight: 2 }} onClick={() => toggleSideBar(openSideBar)}>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <IconButton color="inherit" sx={{ marginRight: 2 }}>
            <FontAwesomeIcon icon={faLandmark} />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          {/* Right side: Letter, Bell, and Sign Out */}
          <IconButton color="inherit" sx={{ marginRight: 2 }}>
            <FontAwesomeIcon icon={faEnvelope} />
          </IconButton>
          <IconButton color="inherit" sx={{ marginRight: 2 }}>
            <FontAwesomeIcon icon={faBell} />
          </IconButton>
          <IconButton color="inherit">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </IconButton>
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            SIGN OUT
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
