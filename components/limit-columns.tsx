"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type RiskUser = {
  id: number;
  username: string;
  limit: number;
  risk: "High" | "Medium" | "Low";
};

export const riskColumns: ColumnDef<RiskUser>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "limit",
    header: "Limit",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("limit"));

      return <div className="font-medium">${amount.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "risk",
    header: "Risk",
    cell: ({ row }) => {
      const risk = row.getValue("risk") as "High" | "Medium" | "Low";
      const variant = {
        High: "destructive",
        Medium: "secondary",
        Low: "default",
      }[risk] as "destructive" | "secondary" | "default";

      return <Badge variant={variant}>{risk}</Badge>;
    },
  },
];
