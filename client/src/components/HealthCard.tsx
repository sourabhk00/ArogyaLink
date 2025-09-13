import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HealthCardProps {
  title: string;
  value: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  loading?: boolean;
  testId?: string;
  onClick?: () => void;
}

export default function HealthCard({
  title,
  value,
  icon,
  iconColor,
  iconBg,
  loading = false,
  testId,
  onClick,
}: HealthCardProps) {
  return (
    <Card 
      className={cn(
        "health-card cursor-pointer",
        onClick && "hover:shadow-lg"
      )}
      onClick={onClick}
      data-testid={testId}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {loading ? (
              <div className="w-8 h-8 mt-2">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <p className="text-2xl font-bold text-foreground" data-testid={`${testId}-value`}>
                {value}
              </p>
            )}
          </div>
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", iconBg)}>
            <i className={cn(icon, iconColor, "text-xl")}></i>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
