import PageLimits from "../../components/atoms/page-limits";
import Error from "../../components/molecules/error";
import Loader from "../../components/molecules/loader";
import useFetchCategories from "../../hooks/fetch/useFetchCategories";
import "./styles.scss";
import CategoryCard from "../../components/molecules/category-card";

import useFetchProducts from "../../hooks/fetch/useFetchProducts";
import Category from "../../entities/products/Category";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  // http://localhost:3000/?category=1
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const categoryData = useFetchCategories();
  const productsData = useFetchProducts(category);

  if (categoryData.error || productsData.error) return <Error />;

  if (categoryData.loading || productsData.loading) return <Loader />;

  const { categories } = categoryData;
  const { products } = productsData;

  console.log(products, categories);

  return (
    <PageLimits>
      <section className="caregories-container">
        <label className="categories-title">Categorias</label>
        <div className="categories-grid">
          {categories.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </PageLimits>
  );
}
