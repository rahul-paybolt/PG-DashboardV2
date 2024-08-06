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
}
const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  selectionData,
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
      variant="bordered"
      placeholder={placeholder}
      selectedKeys={value ? new Set([value]) : new Set([])}
      className="max-w-xs"
      onSelectionChange={handleSelectionChange}
      ght-transparent
      border-medium
      border-default-200
      classNames={{
        label: "text-secondary",
        mainWrapper: "bg-white dark:bg-default-200/60 shadow-large rounded-xl w-[380px] mb-4 ",
        innerWrapper:
          "bg-white dark:bg-default-200/60 hover:border-none hover:bg-white dark:hover:bg-default/70 focus-within:!bg-white/50 dark:focus-within:!bg-default/60 !cursor-pointer border-none data-[hover=true]:border-none data-[open=true]:border-none data-[focus=true]:border-none",
        listboxWrapper: "border-none",
        trigger: "border-none",
      }}
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
