import { Search } from "lucide-react";
import TextField from "../text-field";

interface SearchbarProps {
  setSearchBy: (value: string) => void;
}

export default function Searchbar({ setSearchBy }: SearchbarProps) {
  return (
    <TextField placeholder="What are you looking for?" id="searchBy" type="text" label="Search" onChange={(e) => setSearchBy(e.target.value)}>
      <Search className="label-icon" />
    </TextField>
  );
}
