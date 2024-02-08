import base from "../base.api";
import { CreateProductDto } from "./dtos/create-product.dto";

const products = {
  getProducts: async (category?: string) => (category ? await base.get(`/products/category/${category}`) : await base.get("/products")),
  deleteProduct: async (id: string) => await base.delete(`/products/${id}`),
  getProduct: async (id: string) => await base.get(`/products/${id}`),
  createProduct: async (data: CreateProductDto) => await base.post("/products", data),
  updateProduct: async (id: string, data: Partial<CreateProductDto>) => await base.patch(`/products/${id}`, data),
  updatePhoto: async (id: string, photo: FormData) => await base.patch(`/products/photo/${id}`, photo),
};

export default products;
