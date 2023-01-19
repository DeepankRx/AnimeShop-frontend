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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InstagramIcon  from "@mui/icons-material/Instagram";
import FacebookIcon  from "@mui/icons-material/Facebook";
import WhatsAppIcon  from "@mui/icons-material/WhatsApp";

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
    <div className="text-white">
    <div className="bg-primary py-[5px] border-b-2 px-20 smrev:px-2 border-b-white flex justify-between">
      <p>Hassle free returns within a week</p>
      <div className="space-x-2">
        <InstagramIcon/>
        <FacebookIcon/>
        <WhatsAppIcon/>
      </div>
    </div>
    <div className="w-[100%]  bg-primary p-2 px-20 smrev:p-2 flex  justify-between items-center m-auto">
      <div className="text-xl font-semibold">Zerox Store</div>
      <div className="flex space-x-4">
        <div className="flex justify-center items-center px-2 space-x-1 "><PersonIcon fontSize='large'/><span className="font-bold uppercase smrev:hidden">Account</span></div>
        <div className="flex justify-center items-center px-2 space-x-1 "><ShoppingCartIcon fontSize='large'/><span className="font-bold uppercase smrev:hidden">Cart</span></div>

      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="hover:cursor-pointer bg-black rounded-full p-2" onClick={toggleDrawer(anchor, true)}><MenuIcon  fontSize='large'/></div>
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
    </div>
    </div>
  );
}
