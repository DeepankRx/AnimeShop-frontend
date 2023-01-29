import http from './http_service';


const BASE_URL={
  userApi : '/api/user',
  addressApi : '/api/address',
  productApi : '/api/product',
}

const userModule={
  signup:BASE_URL.userApi+'/signup',
  login:BASE_URL.userApi+'/login',
  postAddress:BASE_URL.addressApi+'/address/addAddress',
  getUserProfile:BASE_URL.userApi+'/userProfile/',
  createProduct:BASE_URL.productApi+'/create',
  updateProduct:BASE_URL.productApi+'/update/',
  deleteProduct:BASE_URL.productApi+'/delete/',
  getProducts:BASE_URL.productApi+'/getAll',
  getProduct:BASE_URL.productApi+'/get/',
  getProductByCategory:BASE_URL.productApi+'/getByCategory/',
  productGroupBySubCategory:BASE_URL.productApi+'/product-by-sub-category/',
  allProductGroupBySubCategory:BASE_URL.productApi+'/all-product-by-sub-category',
  getTopProducts:BASE_URL.productApi+'/top-products',
  getCategories:BASE_URL.productApi+'/categories',
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

export function createProduct(product) {
  return http.post(userModule.createProduct, product);
}

export function updateProduct(id,product) {
  return http.put(userModule.updateProduct + id, product);
}

export function deleteProduct(id) {
  return http.delete(userModule.deleteProduct + id);
}

export function getProducts() {
  return http.get(userModule.getProducts);
}

export function getProduct(id) {
  return http.get(userModule.getProduct + id);
}

export function getProductByCategory(category) {
  return http.get(userModule.getProductByCategory + category);
}

export function productGroupBySubCategory(subCategory) {
  return http.get(userModule.productGroupBySubCategory + subCategory);
}

export function allProductGroupBySubCategory() {
  return http.get(userModule.allProductGroupBySubCategory);
}

export function getTopProducts() {
  return http.get(userModule.getTopProducts);
}

export function getCategories() {
  return http.get(userModule.getCategories);
}
