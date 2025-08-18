"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const packages = [
  { name: "Bali Adventure", price: "$299", img: "/images/bali.jpg" },
  { name: "Lombok Escape", price: "$199", img: "/images/lombok.jpg" },
  { name: "Jogja Culture", price: "$249", img: "/images/jogja.jpg" },
];

export function TravelPackages() {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle>Travel Packages</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {packages.map((pkg, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <Image src={pkg.img} alt={pkg.name} width={400} height={200} className="w-full h-32 object-cover" />
            <div className="p-2">
              <h3 className="font-semibold">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground">{pkg.price}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
