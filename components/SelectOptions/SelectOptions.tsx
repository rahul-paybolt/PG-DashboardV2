import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { BUSINESS_TYPES } from "@/interfaces/Register/register-interface";
export interface selectionDataProps {
  key: string | BUSINESS_TYPES;
  label: string;
}
interface CustomSelectProps {
  label: string;
  placeholder?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  selectionData: selectionDataProps[];
  variant?: "flat" | "bordered" | "faded" | "underlined";
  classNames?: Partial<
    Record<
      | "base"
      | "label"
      | "trigger"
      | "mainWrapper"
      | "innerWrapper"
      | "selectorIcon"
      | "value"
      | "listboxWrapper"
      | "listbox"
      | "popoverContent"
      | "helperWrapper"
      | "description"
      | "errorMessage",
      string
    >
  >;
  name?: string;
}
const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  selectionData,
  classNames,
  variant,
  name,
}) => {
  const handleSelectionChange = (selectedKeys: Set<string>) => {
    // Since Select in Next UI accepts Set<string> for selectedKeys, convert to string or null
    const selectedValue =
      selectedKeys.size > 0 ? Array.from(selectedKeys)[0] : null;
    onChange(selectedValue);
  };
  return (
    <Select
      label={label}
      variant={variant}
      placeholder={placeholder}
      selectedKeys={value ? new Set([value]) : new Set([])}
      className="max-w-xs"
      onSelectionChange={handleSelectionChange}
      ght-transparent
      border-medium
      border-default-200
      classNames={classNames}
      name={name}
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
