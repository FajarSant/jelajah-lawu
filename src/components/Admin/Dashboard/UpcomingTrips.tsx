"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trips = [
  { name: "Bali Adventure", date: "25 Aug 2025" },
  { name: "Lombok Escape", date: "5 Sep 2025" },
];

export function UpcomingTrips() {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle>Upcoming Trips</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {trips.map((trip, i) => (
          <div key={i} className="flex justify-between border-b pb-2">
            <span className="font-medium">{trip.name}</span>
            <span className="text-sm text-gray-500">{trip.date}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
