export type TOrder = {
  readonly _id: number;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  ingredientsVisible?: Array<TIngredient>;
  totalPrice?: number;
};

export type TIngredient = {
  id?: string;
  readonly _id: string;
  readonly type: string; // 'sauce', 'bun', 'main'
  readonly name: string;
  readonly price: number;
  readonly calories: number;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly image: string
  readonly image_large: string;
  readonly image_mobile: string;
  counter?: number;
};

export type TUser = {
  email: string | undefined;
  password: string;
  name: string;
  token?: string;
}

export type TLoginForm = {
  email: string;
  password: string;
  name?: string;
  token?: string;
}

export type TResetPasswordForm = {
  email?: string;
  password: string;
  name?: string;
  token?: string;
}

export type TWsSocketMiddlewareActions = {
  wsInit: string;
  wsClose: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
  wsSendMessage?: string;
  wsConnect?: string;
  wsDisconnect?: string;
  wsConnecting?: string;
};

export interface ICard {
  data: TIngredient;
  counter: number;
  onClick: (data: TIngredient) => void;
}