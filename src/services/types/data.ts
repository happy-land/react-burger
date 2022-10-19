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


export interface ICard {
  // data: { _id: number; image: string; price: number; name: string };
  data: TIngredient;
  counter: number;
  // onClick: (data: { _id: number; image: string; price: number; name: string }) => void;
  onClick: (data: TIngredient) => void;
}