// import { getAuthenticatedUser } from '@/utils/auth-utils';
import axios from "axios";

const httpClient = axios.create({ withCredentials: true });

// if needed handle the request
httpClient.interceptors.request.use(
  (config) => {
    // const authenticatedUser = getAuthenticatedUser();
    // if (authenticatedUser && authenticatedUser.token) {
    //   config.headers.Authorization = `Bearer ${authenticatedUser.token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// if needed handle the response
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
