"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

import { title } from "@/components/primitives";

export default function SettlementPage() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("/settlements/charges");
  });

  return (
    <div>
      <h1 className={title()}>Settlement Page</h1>
    </div>
  );
}
