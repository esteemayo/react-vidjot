import http from './httpService';

const apiEndPoint = '/auth';

http.setJwt(getJwt());

export function login(user) {
  return http.post(`${apiEndPoint}/login`, user);
}

export function updateUserPassword(userData) {
  return http.patch(`${apiEndPoint}/update-my-password`, userData);
}

function getJwt() {
  return localStorage.getItem('token');
}
