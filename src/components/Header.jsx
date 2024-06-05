import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          E-COMMERCE APP
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
