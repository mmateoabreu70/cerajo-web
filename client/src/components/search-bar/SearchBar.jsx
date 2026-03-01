import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import "./SearchBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  placeholder = "Buscar productos...",
  className = ""
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const value = search.trim();
    if (!value) return;

    navigate(`/buscar?q=${encodeURIComponent(value)}`);
    setSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={className}>
      <IconField iconPosition="left" style={{ width: "100%" }}>
        <InputIcon
          className="pi pi-search"
          style={{ cursor: "pointer" }}
          onClick={handleSubmit}
        />
        <InputText
          id="search-input"
          name="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full"
        />
      </IconField>
    </div>
  );
}