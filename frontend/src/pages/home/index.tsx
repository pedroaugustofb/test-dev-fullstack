import PageLimits from "../../components/atoms/page-limits";
import Error from "../../components/molecules/error";
import Loader from "../../components/molecules/loader";
import useFetchCategories from "../../hooks/fetch/useFetchCategories";
import "./styles.scss";
import CategoryCard from "../../components/molecules/category-card";

import useFetchProducts from "../../hooks/fetch/useFetchProducts";
import Category from "../../entities/products/Category";
import { useSearchParams } from "react-router-dom";
import Divider from "../../components/atoms/divider";
import { SquareStack, Box, Search } from "lucide-react";
import { useState } from "react";
import TextField from "../../components/molecules/text-field";
import ProductCard from "../../components/molecules/product-card";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const categoryData = useFetchCategories();
  const productsData = useFetchProducts(category);

  const [searchBy, setSearchBy] = useState("");

  if (categoryData.error || productsData.error) return <Error />;

  if (categoryData.loading || productsData.loading) return <Loader />;

  const { categories } = categoryData;
  const { products } = productsData;

  // todo: retirar esse mock
  products.push(products[0], products[0], products[0], products[0], products[0]);

  const filteredProducts = products.filter((product) => product.name.trim().toLowerCase().includes(searchBy.trim().toLowerCase()));

  return (
    <PageLimits>
      <section className="caregories-container">
        <label>
          Categorias <SquareStack className="icon" />
        </label>
        <div className="categories-grid">
          {categories.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <Divider />
      <section className="caregories-container">
        <label>
          Produtos <Box className="icon" />
        </label>

        <TextField placeholder="What are tou looking for?" id="searchBy" type="text" label="Search" onChange={(e) => setSearchBy(e.target.value)}>
          <Search className="label-icon" />
        </TextField>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </PageLimits>
  );
}
