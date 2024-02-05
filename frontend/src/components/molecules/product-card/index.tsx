import "./styles.scss";
import Product from "../../../entities/products/Product";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const link = `/product/${product.id}`;
  return (
    <div onClick={() => navigate(link)} className="product-card-container">
      {product.name}
    </div>
  );
}
