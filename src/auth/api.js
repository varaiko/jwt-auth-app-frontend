import axios from 'axios';
import { authHeaderWithRefresh, getCookie, removeCookies, setCookie } from '../utils/UtilFunctions';
import { API_BASE } from '../config';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getCookie('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const { data } = await axios.post(`${API_BASE}/api/auth/refresh-token`,null,authHeaderWithRefresh());
        setCookie('access_token', data.access_token, 900000);
        originalReq.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalReq);
      } catch {
        removeCookies(['access_token', 'refresh_token']);
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
