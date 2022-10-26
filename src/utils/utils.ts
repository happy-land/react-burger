import { TOrder, TUser } from "../services/types/data";

// export type TResponse<T> = {
//   success: boolean;
//   data?: T;
//   order?: T;
//   user?: T;
// }

export type TResponse<T> = {
  success: boolean;
} & T;

export type TResponseUser<T> = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user?: T;
}

// export const checkResponse = <T>(res: Response) => {
//   return res.ok ? res.json() : Promise.reject(res.status);
// };

export const checkResponse = <T>(res: Response) => {
  return res.ok ? res.json().then(data => data as TResponse<T>) : Promise.reject(res.status);
};


// export const checkSuccess = <T>(data: TResponse<T>) => {
//   return data.success ? data : Promise.reject('Error data');
// }

export const checkSuccess = <T>(response: TResponse<T>) => {
  return response.success ? response : Promise.reject('Error data');
}


export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props?: Record<string, any>) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}