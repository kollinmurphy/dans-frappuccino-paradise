
export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  isDeleted: boolean;
  createdAt: string;
  ProductIngredients: Array<ProductIngredient>;
}

export type ProductIngredient = {
  ingredientId: number;
  productId: number;
  Ingredient: Ingredient;
}

export type Ingredient = {
  id: number;
  name: string;
  price: number;
  quantityOnHand: number;
  hidden: boolean;
}
