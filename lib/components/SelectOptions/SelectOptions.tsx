import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { SharedSelection } from "@nextui-org/react";

export type Key = string;

export interface SelectionDataProps {
  key: Key;
  label: string;
}

interface CustomSelectProps {
  label: string;
  placeholder?: string;
  value: Key | null;
  onChange: (value: Key) => void;
  selectionData: Array<SelectionDataProps>;
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
  const handleSelectionChange = (keys: SharedSelection) => {
    const selectedKey = Array.isArray(keys) ? keys[0] : keys.currentKey || null;
    onChange(selectedKey as Key);
  };

  return (
    <Select
      label={label}
      variant={variant}
      placeholder={placeholder}
      selectedKeys={value !== null ? new Set([value]) : new Set()}
      onSelectionChange={handleSelectionChange}
      classNames={classNames}
      name={name}
    >
      {selectionData.map((item) => (
        <SelectItem key={item.key} value={item.key}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
