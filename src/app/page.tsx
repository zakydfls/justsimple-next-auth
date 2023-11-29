import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Open My Admin
      </Link>
    </div>
  );
}
