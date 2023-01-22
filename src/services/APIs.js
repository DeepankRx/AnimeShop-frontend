import http from './http_service';

const userApiEndpoint = '/api/user';
const addressApiEndpoint = '/api/address';

export function register(user) {
  return http.post(userApiEndpoint + '/signup', user);
}

export function login(user) {
  return http.post(userApiEndpoint + '/login', user);
}

export function getUserProfile(id) {
  return http.get(userApiEndpoint + '/userProfile/' + id);
}

export function addAddress(id, address) {
  return http.post(addressApiEndpoint + '/address/addAddress/' + id, address);
}
