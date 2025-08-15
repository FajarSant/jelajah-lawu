"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  return (
    <div className="flex w-full max-w-xl bg-white rounded-full shadow-lg overflow-hidden">
      <Input
        type="text"
        placeholder="Cari destinasi atau aktivitas..."
        className="border-none rounded-none flex-1 px-4 py-2 focus-visible:ring-0 text-gray-700"
      />
      <Button className="rounded-none bg-blue-500 hover:bg-blue-600 px-6">
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
}
