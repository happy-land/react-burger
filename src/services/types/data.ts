export type TOrder = {
  readonly _id: number;
  readonly ingredients: Array<string>;
  readonly status: string;
  readonly name: string;
  readonly number: number;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type TIngredient = {
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
};
