import { useNavigate } from "react-router-dom";
import Category from "../../../entities/products/Category";
import "./styles.scss";

export default function CategoryCard({ category }: { category: Category }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`?category=${category.id}`);
  };

  const divID = `category-card-${category.id}`;
  const element = document.getElementById(divID);
  if (element) element.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <div id={divID} className="category-card-container" onClick={handleClick}>
      <span>{category.name}</span>
    </div>
  );
}
