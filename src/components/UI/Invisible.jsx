import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { userActions } from '../../store/userSlice';

const Invisible = () => {
    const location=useLocation();
    const dispatch=useDispatch();
    useEffect(() => {
      dispatch(userActions.setLocation(location));
    }, [])
    
  return (
    <></>
  )
}

export default Invisible