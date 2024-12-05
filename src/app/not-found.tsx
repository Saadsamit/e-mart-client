"use client";

import Link from "next/link";
import Button from '@/src/components/UI/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <h2 className="text-orange-600 text-7xl font-bold text-center">
        404
      </h2>
      <p className="text-xl font-semibold text-center">
      Page Not Found
      </p>
      <Link href={"/"}>
        <Button>Home</Button>
      </Link>
    </div>
  );
}