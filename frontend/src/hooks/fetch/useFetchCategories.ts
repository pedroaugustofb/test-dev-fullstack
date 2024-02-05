import { useCallback, useEffect, useState } from "react";
import Category from "../../entities/products/Category";

interface useFetchRandomProductsReturnType {
  categories: Category[];
  loading: boolean;
  error: any;
}

const useFetchCategories = () => {
  const [data, setData] = useState<useFetchRandomProductsReturnType>({
    categories: [],
    loading: true,
    error: null,
  });

  const fetch = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // todo: retirar mock
      const category: Category = {
        id: "1",
        name: "Categoria 1",
        parent: {
          id: "2",
          name: "Categoria 2",
          parent: null,
        },
      };

      setData({ categories: [category], loading: false, error: null });
    } catch (error) {
      setData({ categories: [], loading: false, error });
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return data;
};

export default useFetchCategories;
