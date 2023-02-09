import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Popover } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";
import { ALL_LINKS } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { cartActions } from "../../store/cartSlice";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Badge } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
  },
}));
const CartPopOver = () => {
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);

  const popoverEnter = ({ currentTarget }) => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false);
  };

  const classes = useStyles();

  const [itemAdded, setItemAdded] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const cartRemoveHandler = (_id, size, amount) => {
    dispatch(cartActions.removeItemFromCart({ _id, size, amount }));
  };

  useEffect(() => {
    if(items.length>0){
    setItemAdded(true);
    const timer = setTimeout(() => {
      setItemAdded(false);
    }, 500);
    
    return () => {
      clearTimeout(timer);
    }
    };
  }, [items]);

  return (
    <div>
      <div
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        <IconButton>
          {/* <div
            className={`flex justify-center items-center relative  space-x-2  ${
              itemAdded ? "scale-110 duration-200  ease-linear" : ""
            }`}
          > */}
            <Badge badgeContent={items.length} color="secondary">
              <ShoppingBagIcon
                sx={{
                  ":hover": { color: "#D61355" },
                  color: `${itemAdded ? "red" : "black"} `,
                }}
                fontSize="medium"
                className=""
              />
            </Badge>
          {/* </div> */}
        </IconButton>
      </div>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      >
        <div className="p-2 flex flex-col w-[300px] max-h-[240px] gap-2 ">
          <div className="flex items-center flex-col gap-2 overflow-auto pr-4">
            <div className="w-[100%] flex flex-col gap-2">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 p-2 bg-pink-50 rounded-lg"
                >
                  <h2 className="col-span-2 overflow-hidden">{item.name}</h2>
                  <h2 className="col-span-1">
                    {item.amount} X {item.size}
                  </h2>
                  <div className="flex justify-end">
                    <FontAwesomeIcon
                      onClick={() =>
                        cartRemoveHandler(item._id, item.size, item.amount)
                      }
                      color="red"
                      className="cursor-pointer"
                      icon={faTrash}
                    />
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <h2 className="text-center">No Products Added</h2>
              )}
            </div>
          </div>
          <Button
            onClick={() => {
              navigate(ALL_LINKS.Cart.pageLink);
              popoverLeave();
            }}
            variant="outlined"
            endIcon={<ShoppingBagIcon />}
          >
            View Cart
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default CartPopOver;