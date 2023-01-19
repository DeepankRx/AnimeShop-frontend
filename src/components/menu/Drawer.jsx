import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from '@mui/icons-material/Menu'
import { Dialog, DialogContent } from "@mui/material";
import { ALL_LINKS, DATA } from "../../constant";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'

export default function MainDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menu=[
    {
      name:'Signup',
      pageLink:ALL_LINKS.SignupPage.pageLink,
      icon:<PersonIcon/>
    },
    {
      name:'Login',
      pageLink:ALL_LINKS.LoginPage.pageLink,
      icon:<LoginIcon/>

    },

  ]

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className=" p-2 flex justify-center  text-xl font-bold space-x-4 pt-4">
        <span className="text-red-500">Z</span>
        <span className="text-yellow-500">E</span>
        <span className="text-blue-500">R</span>
        <span className="text-green-500">O</span>
        <span className="text-orange-500">X</span>
      </div>
      <List>
        {menu.map((item, index) => (
          <Link to={item.pageLink} key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="w-[100%] p-2 flex  justify-between items-center m-auto">
      <div className="text-2xl space-x-2">
        <span className="text-red-500">Z</span>
        <span className="text-yellow-500">E</span>
        <span className="text-blue-500">R</span>
        <span className="text-green-500">O</span>
        <span className="text-orange-500">X</span>
      </div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="hover:cursor-pointer bg-blue-50 hover:bg-blue-100 rounded-full p-2" onClick={toggleDrawer(anchor, true)}><MenuIcon  fontSize='large'/></div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
