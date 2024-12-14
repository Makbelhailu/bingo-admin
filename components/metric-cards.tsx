import { Card, CardContent } from "@/components/ui/card";
import {
  UserIcon,
  DollarSignIcon,
  ActivityIcon,
  Calendar1Icon,
} from "lucide-react";

import ServerToast from "@/components/serverToast";
import { fetchMetrics } from "@/lib/api";

interface Metric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const defaultData = [
  {
    label: "Total Users",
    value: "-",
    icon: UserIcon,
    color: "text-blue-500",
  },
  {
    label: "Total Plays",
    value: "-",
    icon: DollarSignIcon,
    color: "text-green-500",
  },
  {
    label: "No of Cartelas",
    value: "-",
    icon: Calendar1Icon,
    color: "text-red-500",
  },
  {
    label: "Active Users",
    value: "-",
    icon: ActivityIcon,
    color: "text-yellow-500",
  },
];

export async function MetricCards() {
  let metrics: Metric[] = defaultData;
  let toastMsg = null;
  try {
    metrics = await fetchMetrics();
  } catch (error: Error | any) {
    metrics = defaultData;
    toastMsg = error.message;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className="transition-all shadow-sm shadow-primary/10 hover:shadow-primary/15 dark:bg-primary/5 hover:shadow-md "
        >
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`rounded-full p-2 ${metric.color} bg-opacity-10`}>
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </p>
              <h3 className="text-2xl font-bold">{metric.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
      <ServerToast message={toastMsg} />
    </div>
  );
}
