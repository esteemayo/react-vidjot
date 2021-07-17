import http from './httpService';

const apiEndPoint = '/users';

export function register(user) {
  return http.post(`${apiEndPoint}/register`, user);
}

export function updateUserData(user) {
  return http.patch(`${apiEndPoint}/update-me`, user);
}

export function deactivateAcc() {
  return http.delete(`${apiEndPoint}/delete-me`);
}
