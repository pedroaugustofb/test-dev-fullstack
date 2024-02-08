import Category from "./Category";

type Product = {
  readonly id: string;
  categories: Category[];
  name: string;
  qty: number;
  price: number;
  photo: string;
};

export default Product;
