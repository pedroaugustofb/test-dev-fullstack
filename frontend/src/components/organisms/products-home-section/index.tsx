import { Box } from "lucide-react";
import Product from "../../../entities/products/Product";
import { useState } from "react";
import ProductCard from "../../molecules/product-card";
import Searchbar from "../../molecules/search-bar";

interface ProductsSectionProps {
  categoryName?: string;
  products: Product[];
}

export default function ProductsSection({ categoryName, products }: ProductsSectionProps) {
  const [searchBy, setSearchBy] = useState("");

  // filter products by search
  const filteredProducts = products.filter((product) => product.name.trim().toLowerCase().includes(searchBy.trim().toLowerCase()));
  return (
    <section className="caregories-container">
      <div>
        <label>
          {categoryName ? `Products on "${categoryName}" category` : "All products"} <Box className="icon" />
        </label>
        <p>Click on the product card to see details</p>
      </div>

      <Searchbar setSearchBy={setSearchBy} />

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
