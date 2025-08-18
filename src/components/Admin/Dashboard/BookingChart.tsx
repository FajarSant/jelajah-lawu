"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

type BookingChartClientProps = {
  data?: {
    month: string;
    total: number;
  }[];
};

export function BookingChartClient({ data }: BookingChartClientProps) {
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r rounded-t-2xl from-indigo-500 to-purple-500">
        <BarChart3 className="w-5 h-5 text-indigo-500" />
        <CardTitle>Grafik Booking Bulanan</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
                padding: "0.5rem 0.75rem",
              }}
              labelStyle={{ color: "#4b5563", fontWeight: "bold" }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 5, fill: "#8b5cf6" }}
              activeDot={{ r: 7, fill: "#6366f1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
