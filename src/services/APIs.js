import http from './http_service';

export const BASE_MAIN_URL = 'https://anime-shop-9r2x.vercel.app';
// export const BASE_MAIN_URL='http://localhost:5001'

const BASE_URL = {
  userApi: BASE_MAIN_URL + '/api/user',
  addressApi: BASE_MAIN_URL + '/api/address',
  productApi: BASE_MAIN_URL + '/api/product',
  sellerApi: BASE_MAIN_URL + '/api/seller',
  cartApi: BASE_MAIN_URL + '/api/cart',
  orderApi: BASE_MAIN_URL + '/api/order',
  paymentApi: BASE_MAIN_URL + '/api/payment',
  wishlistApi: BASE_MAIN_URL + '/api/wishlist',
  orderHistoryApi: BASE_MAIN_URL + '/api/order-history',
  newsletterApi: BASE_MAIN_URL + '/api/newsletter',
  tokenApi: BASE_MAIN_URL + '/api/token'
};

const TOP_PRODUCTS_LIMIT = 4;

const userModule = {
  signup: BASE_URL.userApi + '/signup',
  login: BASE_URL.userApi + '/login',
  loginWithGoogle: BASE_URL.userApi + '/login-with-google',
  postAddress: BASE_URL.addressApi + '/addAddress/',
  getUserAddress: BASE_URL.addressApi + '/get-user-address/',
  updateAddress: BASE_URL.addressApi + '/update-address/',
  getUserProfile: BASE_URL.userApi + '/userProfile/',
  createProduct: BASE_URL.productApi + '/create',
  updateProduct: BASE_URL.productApi + '/update/',
  deleteProduct: BASE_URL.productApi + '/delete/',
  getProducts: BASE_URL.productApi + '/getAll',
  getProduct: BASE_URL.productApi + '/get/',
  getProductByCategory: BASE_URL.productApi + '/getByCategory/',
  productGroupBySubCategory: BASE_URL.productApi + '/product-by-sub-category/',
  allProductGroupBySubCategory: BASE_URL.productApi + '/all-product-by-sub-category',
  getTopProducts: BASE_URL.productApi + `/top-products/?limit=${TOP_PRODUCTS_LIMIT}`,
  getCategories: BASE_URL.productApi + '/categories',
  getFilters: BASE_URL.productApi + '/filters',
  getSellerProducts: BASE_URL.sellerApi + '/products/',
  addToCart: BASE_URL.cartApi + '/add-to-cart',
  deleteProductImage: BASE_URL.productApi + '/delete-image/',
  getUsercart: BASE_URL.cartApi + '/get-cart-by-user/',
  createOrder: BASE_URL.orderApi + '/create-order',
  payment: BASE_URL.paymentApi,
  razorpayCreateOrder: BASE_URL.paymentApi + '/razorpay-create-order',
  capturePayment: BASE_URL.paymentApi + '/capture-payment',
  addToWishlist: BASE_URL.wishlistApi + '/add',
  removeFromWishlist: BASE_URL.wishlistApi + '/remove',
  getWishlistByUser: BASE_URL.wishlistApi + '/get-by-user/',
  getUserOrders: BASE_URL.orderApi + '/user-order/',
  getUserOrderHistory: BASE_URL.orderHistoryApi + '/user/',
  getAllOrdersOfAllUsers: BASE_URL.orderApi + '/all-orders-of-all-users',
  getAllUsers: BASE_URL.userApi + '/all-users',
  getAllCarts: BASE_URL.cartApi + '/get-all-carts',
  getAllOrderHistory: BASE_URL.orderHistoryApi + '/all',
  getAllWishlists: BASE_URL.wishlistApi + '/all',
  addNewsletter: BASE_URL.newsletterApi + '/add',
  isTokenValid: BASE_URL.tokenApi + '/is-valid/',
  addReview: BASE_URL.productApi + '/add-review/',
  changeOrderStatus: BASE_URL.orderApi + '/change-status/',
  changeRole: BASE_URL.userApi + '/change-user-role/',
  getProductByCategoryWithHighestRating: BASE_URL.productApi + '/getProductByCategoryWithHighestRating/',
  duplicateProduct: BASE_URL.productApi + '/duplicate/',
  getAProductFromEachCategory: BASE_URL.productApi + '/one-product-from-each-category/'
};

let token = '';
let userid = '';

const retrieveStoredToken = () => {
  userid = localStorage.getItem('userid');
  token = localStorage.getItem('token');
};

export function register(user) {
  return http.post(userModule.signup, user);
}

export function login(user) {
  return http.post(userModule.login, user);
}

export function getUserProfile(id) {
  retrieveStoredToken();
  return http.get(userModule.getUserProfile + id, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function addAddress(userId, address) {
  retrieveStoredToken();
  return http.post(userModule.postAddress + userId, address, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function updateAddress(addressId, address, user) {
  retrieveStoredToken();
  return http.put(userModule.updateAddress + addressId, { address, user }, { headers: { Authorization: `Bearer ${token}` } });
}

export function getUserAddress() {
  retrieveStoredToken();
  return http.get(userModule.getUserAddress + userid, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function createProduct(product) {
  retrieveStoredToken();
  return http.post(userModule.createProduct, product, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export function updateProduct(id, product) {
  retrieveStoredToken();
  return http.put(userModule.updateProduct + id, product, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export function deleteProduct(id) {
  retrieveStoredToken();
  return http.delete(userModule.deleteProduct + id, {
    headers: { Authorization: `Bearer ${token}` }
  });
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

export function getFilters() {
  return http.get(userModule.getFilters);
}

export function getAProductFromEachCategory() {
  return http.get(userModule.getAProductFromEachCategory);
}

export function getSellerProducts(id) {
  retrieveStoredToken();
  return http.get(userModule.getSellerProducts + id, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function getUsercart(id) {
  retrieveStoredToken();
  return http.get(userModule.getUsercart + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function addToCart(cart) {
  retrieveStoredToken();
  return http.put(userModule.addToCart, { ...cart, user: userid }, { headers: { Authorization: `Bearer ${token}` } });
}

export function deleteProductImage(productId, imageUrl) {
  retrieveStoredToken();
  return http.post(userModule.deleteProductImage + productId, { imageUrl }, { headers: { Authorization: `Bearer ${token}` } });
}

export function loginWithGoogle(user) {
  return http.post(userModule.loginWithGoogle, user);
}

export function createOrder(order) {
  retrieveStoredToken();
  return http.post(userModule.createOrder, order, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function payment(data) {
  return http.post(userModule.payment, data);
}

export function razorpayCreateOrder(data) {
  retrieveStoredToken();
  return http.post(userModule.razorpayCreateOrder, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function capturePayment(data) {
  retrieveStoredToken();
  return http.post(userModule.capturePayment, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Wishlist

export function addToWishlist(id) {
  retrieveStoredToken();
  return http.put(userModule.addToWishlist, { productId: id, user: userid }, { headers: { Authorization: `Bearer ${token}` } });
}

export function removeFromWishlist(id) {
  retrieveStoredToken();
  return http.post(userModule.removeFromWishlist, { productId: id, user: userid }, { headers: { Authorization: `Bearer ${token}` } });
}

export function getWishlistByUser() {
  retrieveStoredToken();
  return http.get(userModule.getWishlistByUser + userid, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function getUserOrders() {
  retrieveStoredToken();
  return http.get(userModule.getUserOrders + userid, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function getUserOrderHistory() {
  retrieveStoredToken();
  return http.get(userModule.getUserOrderHistory + userid, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function getAllOrdersOfAllUsers() {
  retrieveStoredToken();
  return http.get(userModule.getAllOrdersOfAllUsers, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function getAllUsers() {
  retrieveStoredToken();
  return http.get(userModule.getAllUsers, { headers: { Authorization: `Bearer ${token}` } });
}

export function getAllCarts() {
  retrieveStoredToken();
  return http.get(userModule.getAllCarts, { headers: { Authorization: `Bearer ${token}` } });
}

export function getAllOrderHistory() {
  retrieveStoredToken();
  return http.get(userModule.getAllOrderHistory, { headers: { Authorization: `Bearer ${token}` } });
}

export function getAllWishlist() {
  retrieveStoredToken();
  return http.get(userModule.getAllWishlists, { headers: { Authorization: `Bearer ${token}` } });
}
export function addNewsletter(email) {
  return http.post(
    userModule.addNewsletter,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export function isTokenValid() {
  retrieveStoredToken();
  return http.get(userModule.isTokenValid + userid, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function addReview(productId, review) {
  retrieveStoredToken();
  return http.put(
    userModule.addReview + productId,
    {
      ...review,
      user: userid
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function changeOrderStatus(id, status) {
  retrieveStoredToken();
  return http.post(userModule.changeOrderStatus + id, { status }, { headers: { Authorization: `Bearer ${token}` } });
}

export function changeRole(id, role) {
  retrieveStoredToken();
  return http.post(userModule.changeRole + id, { role }, { headers: { Authorization: `Bearer ${token}` } });
}

export function getProductByCategoryWithHighestRating(limit, category) {
  return http.get(userModule.getProductByCategoryWithHighestRating + category + '?limit=' + limit);
}

export function duplicateProduct(id) {
  retrieveStoredToken();
  return http.get(userModule.duplicateProduct + id, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
