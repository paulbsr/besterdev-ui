import axios from 'axios';
import { getAccessToken } from './OAuth2TokenService';

const OAuth2APIClient = axios.create({
  baseURL: 'https://besterdev-api-13a0246c9cf2.herokuapp.com'
});

OAuth2APIClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default OAuth2APIClient;