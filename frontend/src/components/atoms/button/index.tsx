import { Loader } from "lucide-react";
import "./styles.scss";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode | JSX.Element;
  color: "primary" | "secondary";
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({ children, ...props }: ButtonProps) {
  const className = `button ${props.color} ${props.loading ? "loading" : ""}`;

  return (
    <button className={className} {...props} disabled={props.loading || props.disabled}>
      {props.loading ? <Loader className="icon-loading" /> : children}
    </button>
  );
}
