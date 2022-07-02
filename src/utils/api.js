import { baseUrl } from './constants';
import { checkResponse, setCookie, getCookie } from './utils';

export const registerRequest = (form) => {
  return fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const loginRequest = async (form) => {
  return await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
};

export const logoutRequest = async () => {
  return await fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};

export const getUserRequest = async () => {
  // console.log('getUserRequest ' + getCookie('accessToken'));
  // return fetch(`${baseUrl}/auth/user`, {
  return await fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + token,
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};

export const updateUserRequest = async (form) => {
  return await fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify(form),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};

export const refreshToken = () => {
  return fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then(checkResponse)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      // Сохранить токены в Cookies и localStorage
      setCookie('accessToken', refreshData.accessToken);
      localStorage.setItem('refreshToken', refreshData.refreshToken);

      return refreshData;
    });
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    // console.log(res);
    return await checkResponse(res);
  } catch (err) {
    console.log('ERROR  ' + err);
    if (err.message === 'jwt expired') {
    // if (err === 403) {
      console.log('jwt expired');
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;

      const res = await fetch(url, options);
      // в заголовках будет новый accessToken
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
