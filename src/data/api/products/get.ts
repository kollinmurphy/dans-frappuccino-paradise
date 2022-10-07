import { Product } from "@data/types/product";
import runApiCall from "..";

const getProducts = async (): Promise<Array<Product>> =>
  runApiCall(
    {
      method: "GET",
      path: "/products",
    },
  );

export default getProducts;
