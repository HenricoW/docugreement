import { Box, Card, CardContent, Divider, MenuItem, MenuList, Typography } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import React from "react";
import { AppName } from "../../pages/_app";

// temp
const errorMessage = "";

const SideMenu = () => {
  const router = useRouter();

  const onLogout = () => {
    // clear out contexts

    // go to landing
    router.push("/");
  };

  return (
    <Card
      variant="outlined"
      sx={{
        background: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(20px)",
        borderColor: "#999",
        m: "1em",
      }}
    >
      <CardContent sx={{ ":last-child": { pb: "16px" } }}>
        <Box display="flex" flexDirection="column" alignItems="center" my="2em">
          <BlurOnIcon sx={{ fontSize: "5em", margin: "0 auto" }} />
          <Typography align="center" variant="h5" my=".5em">
            {AppName}
          </Typography>
        </Box>
        <Divider sx={{ mb: "1em" }} />
        <MenuList>
          <MenuItem onClick={() => router.push("/dashboard")}>
            <Box m="0 auto" display="flex" flexDirection="column" alignItems="center">
              <DashboardIcon sx={{ fontSize: "2.5em", margin: "0 auto" }} />
              <Typography align="center" variant="h6" my=".5em">
                Dashboard
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => router.push("/account")}>
            <Box m="0 auto" display="flex" flexDirection="column" alignItems="center">
              <DashboardIcon sx={{ fontSize: "2.5em", margin: "0 auto" }} />
              <Typography align="center" variant="h6" my=".5em">
                My Account
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={onLogout}>
            <Box m="0 auto" display="flex" flexDirection="column" alignItems="center">
              <LogoutIcon sx={{ fontSize: "2.5em", margin: "0 auto" }} />
              <Typography align="center" variant="h6" my=".5em">
                Sign out
              </Typography>
            </Box>
          </MenuItem>
          {errorMessage ? (
            <Typography mb="2em" color="orange">
              {errorMessage}
            </Typography>
          ) : null}
        </MenuList>
      </CardContent>
    </Card>
  );
};

export default SideMenu;
