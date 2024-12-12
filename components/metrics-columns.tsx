"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Metric = {
  metric: string
  value: string
  change: string
}

export const metricsColumns: ColumnDef<Metric>[] = [
  {
    accessorKey: "metric",
    header: "Metric",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "change",
    header: "Change",
    cell: ({ row }) => {
      const change = row.getValue("change") as string
      const isPositive = !change.startsWith("-")
      return (
        <span className={isPositive ? "text-green-600" : "text-red-600"}>
          {change}
        </span>
      )
    },
  },
]

