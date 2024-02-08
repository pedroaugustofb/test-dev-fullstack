import { Edit, Trash } from "lucide-react";
import Product from "../../../entities/products/Product";
import { formatMoney } from "../../../utils/format";
import Button from "../../atoms/button";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import "./styles.scss";
import ConfirmModal from "../../molecules/confirm-modal-delete";
import { useNavigate } from "react-router-dom";

interface ProductsTableProps {
  products: Product[];
  searchBy: string;
  setProducts: (products: Product[]) => void;
}

type Selected = Product | null;

export default function ProductsTable({ products, searchBy, setProducts }: ProductsTableProps) {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const productsPerPage = 10;
  const numberOfPages = products.length / productsPerPage;

  // to filter products by search
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchBy.toLowerCase()));

  // to paginate products
  const paginatedProducts = filteredProducts.slice((page - 1) * productsPerPage, page * productsPerPage);

  const handleDelete = async (selected: Selected) => {
    try {
      if (selected === null) throw new Error("Selected item is required");

      const { id } = selected;

      const response = await api.products.deleteProduct(id);

      if (!response || response.status !== 200) throw new Error("Error deleting product");

      const newProducts: Product[] = products.filter((product) => product.id !== id);
      // update products
      setSelected(null);
      setProducts(newProducts);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  // para guardar o ID do item a ser deletado enquanto modal de delete está em exibição
  const [selected, setSelected] = useState<Selected>(null);

  const handleEdit = (selected: Selected) => {
    try {
      if (selected === null) throw new Error("Selected item is required");

      const { id } = selected;

      navigate(`/admin/product/${id}`);
    } catch (error) {
      toast.error("Error editing product");
    }
  };
  return (
    <>
      <ConfirmModal product={selected as Product} open={selected !== null} onClose={() => setSelected(null)} onConfirm={() => handleDelete(selected)} />
      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  {product.name}
                </div>
              </td>
              <td>{formatMoney(product.price)}</td>
              <td>{product.qty}</td>
              <td>{product.categories.map((category) => category.name).join(",")}</td>
              <td>
                <div className="actions-column">
                  <Button color="primary" type="button" onClick={() => handleEdit(product)}>
                    <div className="actions-td-area">
                      <label>Edit </label>
                      <Edit className="icon-sm" />
                    </div>
                  </Button>
                  <Button color="secondary" type="button" onClick={() => setSelected(product)}>
                    <div className="actions-td-area">
                      <label>Delete </label>
                      <Trash className="icon-sm" />
                    </div>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div className="pagination-area">
                <div className="pagination">
                  <Button color="secondary" disabled={page <= 1} type="button" onClick={() => setPage((prev) => (prev === 1 ? prev : prev - 1))}>
                    Previous
                  </Button>
                  <span>Page {page}</span>
                  <Button
                    disabled={page >= numberOfPages}
                    color="primary"
                    type="button"
                    onClick={() => setPage((prev) => (prev === numberOfPages ? prev : prev + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
