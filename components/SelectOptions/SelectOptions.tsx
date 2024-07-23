import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
// import CustomSelectProps from "./SelectOptions";
interface CustomSelectProps {
  label: string;
  placeholder?: string;
  value: string | null;
  onChange: (value: string | null) => void;
}
const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  placeholder = "Select an option",
  value,
  onChange,
}) => {
  const SelectOptionsData = [
    { key: "axis", label: "Axis" },
    { key: "hdfc", label: "HDFC" },
    { key: "idfc", label: "IDFC" },
    { key: "fino", label: "Fino" },
    { key: "icici", label: "Icici" },
    { key: "giraffe", label: "Giraffe" },
    { key: "dolphin", label: "Dolphin" },
    { key: "penguin", label: "Penguin" },
    { key: "zebra", label: "Zebra" },
    { key: "shark", label: "Shark" },
    { key: "whale", label: "Whale" },
    { key: "otter", label: "Otter" },
    { key: "crocodile", label: "Crocodile" },
  ];
  const handleSelectionChange = (selectedKeys: Set<string>) => {
    // Since Select in Next UI accepts Set<string> for selectedKeys, convert to string or null
    const selectedValue =
      selectedKeys.size > 0 ? Array.from(selectedKeys)[0] : null;
    onChange(selectedValue);
  };
  return (
    <Select
      label={label}
      variant="bordered"
      placeholder={placeholder}
      selectedKeys={value ? new Set([value]) : new Set([])}
      className="max-w-xs"
      onSelectionChange={handleSelectionChange}
    >
      {SelectOptionsData.map((animal) => (
        <SelectItem key={animal.key} value={animal.key}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CustomSelect;