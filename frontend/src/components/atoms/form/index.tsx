import "./styles.scss";

interface FormProps {
  children: React.ReactNode | JSX.Element;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit} className="form-container">
      {children}
    </form>
  );
}
