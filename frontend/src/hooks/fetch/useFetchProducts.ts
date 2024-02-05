import { useCallback, useEffect, useState } from "react";
import Product from "../../entities/products/Product";

interface useFetchRandomProductsReturnType {
  products: Product[];
  loading: boolean;
  error: any;
}

const useFetchCategories = (category: string) => {
  const [data, setData] = useState<useFetchRandomProductsReturnType>({
    products: [],
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // todo: retirar mock
      const product: Product = {
        id: "1",
        name: "Produto 1",
        price: 100,
        qty: 10,
        photo: "https://via.placeholder.com/150",
        categories: [
          {
            id: "1",
            name: "Categoria 1",
            parent: {
              id: "2",
              name: "Categoria 2",
              parent: null,
            },
          },
        ],
      };

      setData({ products: [product], loading: false, error: null });
    } catch (error) {
      setData({ products: [], loading: false, error });
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return data;
};

export default useFetchCategories;
