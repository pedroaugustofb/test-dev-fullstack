import Error from "../../components/molecules/error";
import Loader from "../../components/molecules/loader";
import useFetchRandomProducts from "../../hooks/fetch/useFetchRandomProducts";
import "./styles.scss";

export default function HomePage() {
  const { loading, error, categories } = useFetchRandomProducts();

  if (error) return <Error />;

  if (loading) return <Loader />;

  return <pre>{JSON.stringify(categories, null, 2)}</pre>;
}
