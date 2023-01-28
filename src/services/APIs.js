import http from './http_service';


const BASE_URL={
  userApi : '/api/user',
  addressApi : '/api/address',
}

const userModule={
  signup:BASE_URL.userApi+'/signup',
  login:BASE_URL.userApi+'/login',
  postAddress:BASE_URL.addressApi+'/address/addAddress',
  getUserProfile:BASE_URL.userApi+'/userProfile/'
}

let token='';
let userid='';

const retrieveStoredToken =()=>{
     userid=localStorage.getItem("userid");
     token=localStorage.getItem("token");
}

export function register(user) {
  return http.post(userModule.signup, user);
}

export function login(user) {
  return http.post(userModule.login, user);
}

export function getUserProfile(id) {
  retrieveStoredToken();
  return http.get(userModule.getUserProfile + id,{ headers: {"Authorization" : `Bearer ${token}`}});
}

export function addAddress( address) {
  retrieveStoredToken();
  return http.post(userModule.postAddress + userid, address);
}
