import { createSlice } from "@reduxjs/toolkit";
import { addToCart, getUsercart } from "../services/APIs";

const initialState={
    items: [],
    totalAmount: 0,
    changed:false
};

export const cartSlice=createSlice({
    name:'cartSlice',
    initialState:initialState,
    reducers:{
        addItemToCart:(state,action)=>{
          const data=action.payload;
        const updatedAmount =
        state.totalAmount + data.item.price * data.item.amount;

          const existingCartItemIndex = state.items.findIndex(
            (item) => item._id === data.item._id && item.size===data.item.size
          );

          const existingCartItem = state.items[existingCartItemIndex];
          let updatedItems;

          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              amount: existingCartItem.amount + data.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            updatedItems = state.items.concat(data.item);
          }
          return {
            items: updatedItems,
            totalAmount: updatedAmount,
            changed: !state.changed
          };
        },
        removeItemFromCart:(state,action)=>{
          const data=action.payload;
          const existingCartItemIndex = state.items.findIndex(
            (item) => (item._id === data._id && item.size===data.size)
          );

          const existingCartItem = state.items[existingCartItemIndex];
          const updatedAmount = state.totalAmount - existingCartItem.price*data.amount;
          let updatedItems=[];
          if (existingCartItem.amount === 1 || existingCartItem.amount===data.amount) {
            // updatedItems = state.items.filter((item) =>  {return (item.size!==data.size && item._id !== data._id)} );
            state.items.map((item,index)=>{if(index!==existingCartItemIndex)updatedItems.push(item)});
          } else {
            const updatedItem = {
              ...existingCartItem,
              amount: existingCartItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
          }

          return {
            items: updatedItems,
            totalAmount: updatedAmount,
            changed: !state.changed
          };
        },
        replaceCart:(state,action)=>{
          let changed = state.changed ;
          if(action.payload.changed) changed = action.payload.changed;
          return {
            items: action.payload.items,
            totalAmount: action.payload.totalAmount,
            changed: changed
          };

        }
    }
})

export const cartActions=cartSlice.actions;

export const fetchCart=(id)=>{
  return async function fetchCartThunk(dispatch){
    const response=await getUsercart(id);
    dispatch(cartActions.replaceCart(response.data.data.cart));
  }
}

export const sendCartData=(data)=>{
  addToCart({cart:{items:data.items,totalAmount:data.totalAmount}});
}