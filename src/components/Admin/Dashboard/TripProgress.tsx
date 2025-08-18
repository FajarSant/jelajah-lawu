"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TripProgress() {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle>Total Trips Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm">Bali</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-[80%]" />
          </div>
        </div>
        <div>
          <p className="text-sm">Lombok</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full w-[65%]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
