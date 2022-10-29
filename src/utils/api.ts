import { TLoginForm, TOrder, TUser } from '../services/types/data';
import { baseUrl } from './constants';
import { checkResponse, setCookie, getCookie } from './utils';


interface CustomResponse extends Response {
  accessToken?: string;
}

export const registerRequest = (user: TUser): Promise<CustomResponse> => {
  return fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const loginRequest = async (form: TLoginForm): Promise<CustomResponse> => {
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

export const logoutRequest = async (): Promise<CustomResponse> => {
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

export const getUserRequest = async (): Promise<CustomResponse> => {
  return await fetch(`${baseUrl}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};

export const updateUserRequest = async (form: TUser): Promise<CustomResponse> => {
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

export const saveOrderRequest = async (data: Array<string>): Promise<CustomResponse> => {
  // return await fetchWithRefresh(`${baseUrl}/orders`, {
  return await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  });
};

type TRefreshTokenData = {
  accessToken: string;
  refreshToken: string;
}

export const refreshToken = (): Promise<TRefreshTokenData> => {
  return fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  })
    .then((result) => checkResponse<TRefreshTokenData>(result))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      // Сохранить токены в Cookies и localStorage
      setCookie('accessToken', refreshData.accessToken, { path: '/' });
      localStorage.setItem('refreshToken', refreshData.refreshToken);

      return refreshData;
    });
};

const fetchWithRefresh = async (url: string, options: any): Promise<CustomResponse> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
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
