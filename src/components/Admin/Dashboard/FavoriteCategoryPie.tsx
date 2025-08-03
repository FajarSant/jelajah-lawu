"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type FavoriteCategoryPieProps = {
  data: { name: string; value: number }[];
};

console.log("FavoriteCategory Data:", );

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

export function FavoriteCategoryPieClient({ data }: FavoriteCategoryPieProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Kategori Favorit
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name }) => name}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
