import { TLoginForm, TOrder, TUser } from '../services/types/data';
import { baseUrl } from './constants';
import { checkResponse, setCookie, getCookie } from './utils';

type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
}

interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  accessToken?: string;
  clone(): Response;
}

export const registerRequest = (user: TUser): Promise<CustomResponse<TResponseBody>> => {
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

export const loginRequest = async (form: TLoginForm): Promise<CustomResponse<TResponseBody>> => {
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

export const logoutRequest = async (): Promise<CustomResponse<TResponseBody>> => {
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

export const getUserRequest = async (): Promise<CustomResponse<TResponseBody>> => {
  return await fetchWithRefresh(`${baseUrl}/auth/user`, {
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

export const updateUserRequest = async (form: TUser): Promise<CustomResponse<TResponseBody>> => {
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

export const saveOrderRequest = async (data: any): Promise<CustomResponse<TResponseBody>> => {
  return await fetchWithRefresh(`${baseUrl}/orders`, {
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

export const refreshToken = (): Promise<CustomResponse<TResponseBody>> => {
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

const fetchWithRefresh = async (url: string, options: RequestInit = {}): Promise<CustomResponse<TResponseBody>> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      const res = await fetch(url, options);
      // в заголовках будет новый accessToken
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
