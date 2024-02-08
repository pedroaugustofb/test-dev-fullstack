export interface CreateProductDto {
  name: string;
  qty: number;
  price: number;
  categories?: string[];
  photo?: File;
}
