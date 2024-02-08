import "../text-field/styles.scss";

interface OptionType {
  id: string | number;
  name: string;
}

interface SelectFieldProps<T extends OptionType> {
  setInput: (value: string) => void;
  options: T[];
  label: string;
}

export default function SelectField<T extends OptionType>({ setInput, options, label }: SelectFieldProps<T>) {
  return (
    <div className="text-field-container">
      <label className="label-text-field">{label}</label>
      <div className="input-field-container">
        <select onChange={(e) => setInput(e.target.value)}>
          <option className="option" value="0">
            Select a category
          </option>
          {options.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
