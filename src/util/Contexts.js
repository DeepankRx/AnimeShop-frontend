import { useContext } from 'react';
import AuthContext from '../store/AuthContext';

export const Contexts = {
  authCtx: useContext(AuthContext)
};
