import { createSlice } from "@reduxjs/toolkit"

const initialState={
    user:{},
    isUpdated:false
}

export const userSlice=createSlice({
    name:'userSlice',
    initialState:initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.user=action.payload
        },
        setUpdated:(state)=>{
            state.isUpdated=!state.isUpdated;
        }
    }
})

export const userActions=userSlice.actions;