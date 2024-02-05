import { useNavigate } from "react-router-dom";
import Category from "../../../entities/products/Category";
import "./styles.scss";

export default function CategoryCard({ category }: { category: Category }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`?category=${category.id}`);
  };

  const divID = `category-card-${category.id}`;

  return (
    <div id={divID} className="category-card-container" onClick={handleClick}>
      <span>{category.name}</span>
    </div>
  );
}
