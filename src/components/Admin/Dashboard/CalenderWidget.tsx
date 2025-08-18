"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function CalendarWidget() {
  const today = new Date();
  const [currentDate] = useState(today);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) daysArray.push(null);
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium flex justify-between">
          <span>{monthNames[month]} {year}</span>
          <div className="space-x-2">
            <button className="px-2">◀</button>
            <button className="px-2">▶</button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground mb-1">
          {dayNames.map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 text-center gap-1">
          {daysArray.map((day, idx) => {
            const isToday = day === today.getDate();
            return (
              <div
                key={idx}
                className={`h-8 flex items-center justify-center rounded-md text-xs 
                  ${day ? "text-gray-800" : "text-transparent"} 
                  ${isToday ? "bg-blue-500 text-white font-bold" : ""}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
