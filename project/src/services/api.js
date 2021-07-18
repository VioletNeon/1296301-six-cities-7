import axios from 'axios';

const BASE_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const token = localStorage.getItem('token') ?? '';

const createAPI = (onBadRequested) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === HttpCode.BAD_REQUEST) {
      onBadRequested();
    }
    throw err;
  };
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {createAPI};
