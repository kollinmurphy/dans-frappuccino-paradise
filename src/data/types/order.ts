import { Ingredient, Product } from "./product";

export type Order = {
  id: number;
  status: 'created' | 'cancelled' | 'fulfilled' | 'purchased';
  paid: boolean;
  total?: number;
  createdAt: string;
  updatedAt: string;
  OrderProducts: Array<OrderProduct>;
}

export type OrderProduct = {
  id: number;
  productId: number;
  orderId: number;
  size: 'small' | 'medium' | 'large';
  Product: Product;
  OrderProductIngredients: Array<OrderProductIngredients>;
  createdAt: string;
  updatedAt: string;
}

export type OrderProductIngredients = {
  id: number;
  orderProductId: number;
  ingredientId: number;
  quantity: number;
  createdAt: string;
  Ingredient: Ingredient;
}
