import { useCallback, useEffect, useState } from "react";
import Product from "../../entities/products/Product";
import api from "../../api";

interface useFetchRandomProductsReturnType {
  product?: Product;
  loading: boolean;
  error: any;
}

const useFetchProduct = (id: string) => {
  const [data, setData] = useState<useFetchRandomProductsReturnType>({
    product: undefined,
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    try {
      if (!id) throw new Error("Product ID is required");

      const response = await api.products.getProduct(id);

      if (!response || response.status !== 200) throw new Error("Error fetching products");
      const { product } = response.data;

      setData({ product: product, loading: false, error: null });
    } catch (error) {
      setData({ product: undefined, loading: false, error });
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return data;
};

export default useFetchProduct;
