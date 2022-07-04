import http from './httpService';

const apiEndPoint = '/users';

export const register = (user) => http.post(`${apiEndPoint}/register`, user);

export const updateUserData = (user) =>
  http.patch(`${apiEndPoint}/update-me`, user);

export const deactivateAcc = () => http.delete(`${apiEndPoint}/delete-me`);
