import PageLimits from "../../components/atoms/page-limits";
import Error from "../../components/molecules/error";
import Loader from "../../components/molecules/loader";
import useFetchCategories from "../../hooks/fetch/useFetchCategories";
import "./styles.scss";
import useFetchProducts from "../../hooks/fetch/useFetchProducts";
import { useSearchParams } from "react-router-dom";
import Divider from "../../components/atoms/divider";
import CategorySection from "../../components/organisms/category-home-section";
import ProductsSection from "../../components/organisms/products-home-section";

export default function HomePage() {
  // get category param from url
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  // fetching data
  const categoryData = useFetchCategories();
  const productsData = useFetchProducts(category);

  if (categoryData.error || productsData.error) return <Error />;

  if (categoryData.loading || productsData.loading) return <Loader />;

  const { categories } = categoryData;
  const { products } = productsData;

  // get category name of the current category param on url
  const categoryName = categories.find((category_) => category_.id === category)?.name;

  return (
    <PageLimits>
      <CategorySection categories={categories} categoryId={category} />
      <Divider />
      <ProductsSection categoryName={categoryName} products={products} />
    </PageLimits>
  );
}
