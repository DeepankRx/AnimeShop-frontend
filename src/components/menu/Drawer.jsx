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
import HomeIcon  from "@mui/icons-material/Home";
import MenuPopOver from "./MenuPopOver";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import LeftPane from "./LeftPane";

export default function MainDrawer() {
  const authCtx=useContext(AuthContext);
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

  // const menu=[
  //   {
  //     name:'Home',
  //     pageLink:ALL_LINKS.HomePage.pageLink,
  //     icon:<HomeIcon/>,
  //     showAlways:true
  //   },
  //   {
  //     name:'Signup',
  //     pageLink:ALL_LINKS.SignupPage.pageLink,
  //     icon:<PersonIcon/>,
  //     showLoggedIn:false
  //   },
  //   {
  //     name:'Login',
  //     pageLink:ALL_LINKS.LoginPage.pageLink,
  //     icon:<LoginIcon/>,
  //     showLoggedIn:false
  //   },
  // ]



  // const showMenu={
  //   'logout':[menu[0],menu[1],menu[2]],
  //   'customer':[menu[0]],
  // }


  // let loadMenu=[];
  // if(authCtx.isLoggedIn){
  //   loadMenu=showMenu[authCtx.role]
  // }else{
  //   loadMenu=showMenu.logout;
  // }


  const list = (anchor) => {
    return(
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <div className=" p-2 flex justify-center  text-xl font-bold space-x-4 pt-4">
        <span className="text-red-500">Z</span>
        <span className="text-yellow-500">E</span>
        <span className="text-blue-500">R</span>
        <span className="text-green-500">O</span>
        <span className="text-orange-500">X</span>
      </div>
      <List>
        {loadMenu.map((item, index) => 
          <Link to={item.pageLink} key={index}>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Link>
        )}
      </List> */}
      <LeftPane/>
    </Box>
  )};

  return (
    <div className="text-white">
    <div className="bg-black py-[5px] border-b-2  px-2 border-b-white flex justify-between">
      <p>Hassle free returns within a week</p>
      <div className="space-x-2">
        <InstagramIcon fontSize="small"/>
        <FacebookIcon fontSize="small"/>
        <WhatsAppIcon fontSize="small"/>
      </div>
    </div>
    <div className="w-[100%]  bg-white text-black   py-4 px-2 flex  justify-between items-center m-auto">
      <Link to={ALL_LINKS.HomePage.pageLink} className="text-xl font-semibold">Zerox Store</Link>
      <div className="flex space-x-1 items-center">
        <MenuPopOver/>
        {authCtx.role!=='seller' &&
        <Button variant='text' sx={{color:'black'}}>
      <div className="flex justify-center items-center  space-x-2 "><ShoppingCartIcon sx={{':hover':{color:'#D61355'}}} fontSize='small'/><span className="font-bold  smrev:hidden"></span></div>
      </Button>
}
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={`hover:cursor-pointer bg-black rounded-full p-2 ${authCtx.role==='seller' ?  '' :''}`} onClick={toggleDrawer(anchor, true)}><MenuIcon sx={{color:'white'}}  fontSize='medium'/></div>
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
