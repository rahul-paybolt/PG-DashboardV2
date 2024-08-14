import Toast from "@/lib/components/Toast/Toast";
import { ToastStore } from "@/store/toast-store";
import React from "react";

const page = () => {
  const { data, resetData } = ToastStore();
  return (
    <Toast
      open={!!data.message}
      message={data.message}
      type={data.type}
      onClose={() => {
        resetData();
      }}
    />
  );
};

export default page;
