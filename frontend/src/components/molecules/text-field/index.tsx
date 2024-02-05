import { useState } from "react";
import "./styles.scss";
import { Eye, EyeOff, X } from "lucide-react";

interface TextFieldProps {
  id: string;
  label: string;
  register?: any;
  type: string;
  placeholder: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

export default function TextField(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="text-field-container">
      <label className="label-text-field" htmlFor={props.id}>
        {props.label} {props.children}
      </label>
      <div className="input-field-container">
        <input
          type={props.type === "password" && showPassword ? "text" : props.type}
          {...props.register}
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
        {props.type === "password" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
            className="password-toggle"
          >
            {showPassword ? <Eye className="icon" /> : <EyeOff className="icon" />}
          </button>
        )}
        {props.error && (
          <span className="error-message-container" role="alert">
            <X className="icon" />
            {props.error}
          </span>
        )}
      </div>
    </div>
  );
}
