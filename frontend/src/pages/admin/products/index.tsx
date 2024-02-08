import { PlusCircle } from "lucide-react";
import Button from "../../../components/atoms/button";
import PageLimits from "../../../components/atoms/page-limits";
import "./styles.scss";
import { useState } from "react";
import useFetchProducts from "../../../hooks/fetch/useFetchProducts";
import Loader from "../../../components/molecules/loader";
import ErrorPage from "../../../components/molecules/error";
import Searchbar from "../../../components/molecules/search-bar";
import ProductsTable from "../../../components/organisms/products-table";
import { useNavigate } from "react-router-dom";

export default function Products() {
  // estado para controlar a busca
  const [searchBy, setSearchBy] = useState<string>("");

  // hook para buscar os produtos
  const { loading, error, products, setProducts } = useFetchProducts();

  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (error) return <ErrorPage />;

  return (
    <PageLimits>
      <section className="products-page-container">
        <h1>Products</h1>

        <div className="actions-area">
          <Searchbar setSearchBy={setSearchBy} />
          <Button color="primary" type="button" onClick={() => navigate("/admin/product")}>
            <div className="create-product-button">
              Create Product <PlusCircle />
            </div>
          </Button>
        </div>

        <div className="overflow-scroll-table">
          <ProductsTable products={products} setProducts={setProducts} searchBy={searchBy} />
        </div>
      </section>
    </PageLimits>
  );
}
