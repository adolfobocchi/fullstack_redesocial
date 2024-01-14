import axios from 'axios';
import {store} from '../store/index';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_API}/api`,
});

api.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;