import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type AdminCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  className?: string;
};

export function AdminCard({ title, value, icon: Icon, className }: AdminCardProps) {
  return (
    <Card className={cn("rounded-2xl shadow-md hover:shadow-lg transition-all duration-300", className)}>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-primary mt-1">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 text-primary rounded-full">
          <Icon className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
