import { useState } from "react";
import React from "react";
import { toast } from "react-toastify";
const AuthContext=React.createContext({
    role:"",
    token:"",
    userid:"",
    isLoggedIn:false,
    login: (token) => {},
    logout: () => {},
    updateRole:()=>{}
})

const retrieveStoredToken = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    const role = localStorage.getItem("role");
  
    return { token,userid,role};
  };

export const AuthContextProvider=(props)=>
{

    const tokenData = retrieveStoredToken();
    let initialToken;
    let initialUserid;
    let initialRole;
    if (tokenData) {
      initialToken = tokenData.token;
      initialUserid=tokenData.userid;
      initialRole=tokenData.role;

    }
    const [token, setToken] = useState(initialToken);
    const [role, setRole] = useState(initialRole);
    const [userid, setUserId] = useState(initialUserid);
    const [isLoggedIn,setIsLoggedIn]=useState(!!initialToken)

    const updateRoleHandler=(role)=>{
      localStorage.setItem('role',role);
      setRole(role);
    }
    const logoutHandler = () => {
        setToken(null);
        setIsLoggedIn(false);
        setUserId(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        localStorage.removeItem("role");
        toast.success("Logged out Successfully")
      };

      const loginHandler = (token,userid,role) => {
        setToken(token);
        setUserId(userid);
        setIsLoggedIn(true);
        setRole(role);
        localStorage.setItem("token", token);
        localStorage.setItem("userid", userid);
        localStorage.setItem("role", role);

      };

      const tokenValue = {
        token: token,
        userid:userid,
        role:role,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        updateRole:updateRoleHandler
      };

      return (
        <AuthContext.Provider value={tokenValue}>
          {props.children}
        </AuthContext.Provider>
      );
}

export default AuthContext