"use client";
import React from "react";
import { DateRangePicker } from "@nextui-org/date-picker";

export default function App() {
  return (
    <DateRangePicker
      label="Stay duration"
      isRequired
      className="max-w-xs shadow-md rounded-full"
      color="default"
      classNames={{
        inputWrapper:
          "bg-zinc-50 dark:bg-default-100 border dark:border-none rounded-md",
      }}
    />
  );
}
