import http from './httpService';
import { getFromStorage, tokenKey } from 'util/index';

const apiEndPoint = '/auth';

export const login = (user) => http.post(`${apiEndPoint}/login`, user);

export const updateUserPassword = (userData) =>
  http.patch(`${apiEndPoint}/update-my-password`, userData);

export const getJwt = () => getFromStorage(tokenKey)?.token;
