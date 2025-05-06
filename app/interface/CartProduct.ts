import Product from "./Product";

export default interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
}
