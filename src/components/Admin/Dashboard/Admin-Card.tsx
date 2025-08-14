import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type AdminCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  gradient?: string; // untuk gradient icon
  className?: string;
};

export function AdminCard({
  title,
  value,
  icon: Icon,
  gradient = "from-blue-500 to-indigo-500",
  className,
}: AdminCardProps) {
  return (
    <Card
      className={cn(
        "rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-gray-100",
        className
      )}
    >
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-primary mt-1">{value}</p>
        </div>
        <div
          className={cn(
            "p-3 rounded-full text-white",
            `bg-gradient-to-r ${gradient}`
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
