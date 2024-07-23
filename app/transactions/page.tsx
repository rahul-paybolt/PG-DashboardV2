"use client";

import Input from "@/components/InputContainer/Input";
import { SearchIcon } from "@/public/assests/Icon/SearchIcon";
import { useRef, useState } from "react";
import CustomDateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import CustomSelect from "@/components/SelectOptions/SelectOptions";
import CustomTable from "@/components/CustomTable/Table";
const Transactions = () => {
  const inputRef = useRef(null);

  const [inputField, setInputField] = useState("");
  const [selectedMerchants, setSelectedMerchants] = useState("");

  const handleSelection = (value: string) => {
    setSelectedMerchants(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const SerchIcon = () => {
    return (
      <SearchIcon
        className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
        height={12}
        width={12}
      />
    );
  };
  return (
    <>
      <h1>Hello!!</h1>
      <Input
        ref={inputRef}
        label="Search"
        type="search"
        placeholder="Type to search..."
        startContent={<SerchIcon />}
        onChange={(e) => handleChange(e)}
      />
      <CustomDateRangePicker />
      <CustomSelect
        label="Favorite Animal"
        placeholder="Select an animal"
        value={selectedMerchants}
        onChange={(value) => handleSelection(value)}
      />
      <CustomTable />
    </>
  );
};

export default Transactions;
