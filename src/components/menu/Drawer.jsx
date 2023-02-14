import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from '@mui/icons-material/Menu'
import { ALL_LINKS, DATA } from "../../constant";
import { Link } from "react-router-dom";
import InstagramIcon  from "@mui/icons-material/Instagram";
import FacebookIcon  from "@mui/icons-material/Facebook";
import WhatsAppIcon  from "@mui/icons-material/WhatsApp";
import MenuPopOver from "./MenuPopOver";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import LeftPane from "./LeftPane";
import CartPopOver from "./CartPopOver";

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


  const list = (anchor) => {
    return(
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <LeftPane/>
    </Box>
  )};

  return (
    <div className="text-white shadow-xl">
    {/* <div className="bg-black py-[5px] border-b-2  px-2 border-b-white flex justify-between">
      <p>Hassle free returns within a week</p>
      <div className="space-x-2">
        <InstagramIcon fontSize="small"/>
        <FacebookIcon fontSize="small"/>
        <WhatsAppIcon fontSize="small"/>
      </div>
    </div> */}
    <div className="w-[100%]  bg-white text-black   py-4 px-2 flex  justify-between items-center m-auto">
      <Link to={ALL_LINKS.HomePage.pageLink} className="text-4xl font-semibold tracking-wide hover:scale-105 duration-200 hover:text-purple-500" id='RubyVinyl'>ANIMART</Link>
      <div className="flex items-center space-x-4 smrev:space-x-2">
        <MenuPopOver/>
        {authCtx.role!=='seller' && <CartPopOver/>}
         {/* <Button variant='text' sx={{color:'black'}}> */}
       {/* <div className="flex justify-center items-center  space-x-2 "><ShoppingCartIcon sx={{':hover':{color:'#D61355'}}} fontSize='small'/><span className="font-bold  smrev:hidden"></span></div> */}
       {/* </Button> */}

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
