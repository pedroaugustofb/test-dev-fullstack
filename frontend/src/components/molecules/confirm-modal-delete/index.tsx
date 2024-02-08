import Product from "../../../entities/products/Product";
import Button from "../../atoms/button";
import Dialog, { DialogProps } from "../../atoms/dialog";
import "./styles.scss";

interface ConfirmModalProps extends DialogProps {
  onConfirm: () => void;
  product: Product;
}

export default function ConfirmModal({ open, onClose, onConfirm, product }: ConfirmModalProps) {
  if (!product) return <></>;
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="confirm-modal-container">
        <h2>Deletar Item</h2>
        <div className="modal-text-area">
          <p>
            Tem certeza que deseja deletar o item <strong>{product.name}</strong>?
          </p>
        </div>
        <div className="modal-button-area">
          <Button color="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="primary" type="button" onClick={onConfirm}>
            Deletar Item
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
