"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserIcon,
  DollarSignIcon,
  AlertTriangleIcon,
  ActivityIcon,
} from "lucide-react";
import { defaultMetrics } from "@/lib/default-data";
import { useToast } from "@/hooks/use-toast";

interface Metric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

export function MetricCards() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: "Total Users",
      value: defaultMetrics.totalUsers.toLocaleString(),
      icon: UserIcon,
      color: "text-blue-500",
    },
    {
      label: "Total Bets",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(defaultMetrics.totalBets),
      icon: DollarSignIcon,
      color: "text-green-500",
    },
    {
      label: "High Risk Users",
      value: defaultMetrics.highRiskUsers.toLocaleString(),
      icon: AlertTriangleIcon,
      color: "text-red-500",
    },
    {
      label: "Active Users",
      value: defaultMetrics.activeUsers.toLocaleString(),
      icon: ActivityIcon,
      color: "text-yellow-500",
    },
  ]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics");
        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }
        const data = await response.json();
        setMetrics([
          {
            label: "Total Users",
            value: data.totalUsers.toLocaleString(),
            icon: UserIcon,
            color: "text-blue-500",
          },
          {
            label: "Total Bets",
            value: new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "ETB",
            }).format(data.totalBets),
            icon: DollarSignIcon,
            color: "text-green-500",
          },
          {
            label: "High Risk Users",
            value: data.highRiskUsers.toLocaleString(),
            icon: AlertTriangleIcon,
            color: "text-red-500",
          },
          {
            label: "Active Users",
            value: data.activeUsers.toLocaleString(),
            icon: ActivityIcon,
            color: "text-yellow-500",
          },
        ]);
      } catch (error: Error | any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    };

    fetchMetrics();
  }, []);

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
    </div>
  );
}
