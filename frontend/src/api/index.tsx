import auth from "./auth/auth.api";
import products from "./products/products.api";
import categories from "./category/categories.api";

const api = {
  auth,
  categories,
  products,
};

export default api;
