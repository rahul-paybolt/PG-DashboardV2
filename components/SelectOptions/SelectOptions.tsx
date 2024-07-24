import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
// import CustomSelectProps from "./SelectOptions";
export interface selectionDataProps {
  key: string;
  label: string;
}
interface CustomSelectProps {
  label: string;
  placeholder?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  selectionData: selectionDataProps[];
}
const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  selectionData,
}) => {
  console.log("data", selectionData)
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
      {selectionData.map((items) => (
        <SelectItem key={items.key} value={items.key}>
          {items.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
