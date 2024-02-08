import { useCallback, useEffect, useState } from "react";
import Category from "../../entities/products/Category";
import api from "../../api";

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
      const response = await api.categories.getCategories();

      if (response.status !== 200) throw new Error("Error fetching categories");

      setData({ categories: response.data.categories, loading: false, error: null });
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
