import { useCallback, useEffect, useState } from "react";
import Product from "../../entities/products/Product";
import api from "../../api";

interface useFetchRandomProductsReturnType {
  products: Product[];
  loading: boolean;
  error: any;
}

const useFetchProducts = (category?: string) => {
  const [data, setData] = useState<useFetchRandomProductsReturnType>({
    products: [],
    loading: true,
    error: null,
  });

  const setProducts = (products: Product[]) => setData({ ...data, products });

  const fetch = useCallback(async () => {
    try {
      const response = await api.products.getProducts(category);

      if (!response || response.status !== 200) throw new Error("Error fetching products");
      console.log(response);
      const { products } = response.data;

      setData({ products: products, loading: false, error: null });
    } catch (error) {
      setData({ products: [], loading: false, error });
    }
  }, [category]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    ...data,
    setProducts,
  };
};

export default useFetchProducts;
