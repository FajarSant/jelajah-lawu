// src/components/Admin/Dashboard/Dashboard-Chart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as LineTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BarChart3, ChevronDown } from "lucide-react";

// Props type
interface RevenueDataItem {
  month: string;
  total: number;
}

interface FavoriteDataItem {
  name: string;
  value: number;
}

interface DashboardChartProps {
  revenueData: RevenueDataItem[];
  favoriteData: FavoriteDataItem[];
}

// Colors untuk pie chart
const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#3B82F6"];

export function DashboardChart({
  revenueData,
  favoriteData,
}: DashboardChartProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Revenue Overview */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r rounded-t-2xl from-indigo-500 to-purple-500">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          <CardTitle>Grafik Booking Bulanan</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
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

      {/* Favorite Categories */}
      <Card className="rounded-xl shadow-md bg-white">
        <CardHeader className="flex justify-between items-center pb-2">
          <CardTitle className="text-base font-medium text-gray-700">
            Top Destinations
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-500 bg-blue-50 hover:bg-blue-100"
              >
                This Month <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>Last Month</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex gap-4 items-center">
          <div className="w-1/2 h-52">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={favoriteData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {favoriteData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 space-y-2">
            {favoriteData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>
                  {item.name} ({item.value}%)
                </span>
                {/* <span className="ml-auto text-gray-500">{item.participants?.toLocaleString()} Participants</span> */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
