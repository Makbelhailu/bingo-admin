"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import ToolTip from "@/components/toolTip";

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  cut: number;
  houseCut: number;
  limit: number;
  cartela: string;
  status: boolean;
};

const PasswordCell = ({ password }: { password: string }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <span>{showPassword ? password : "••••••••"}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      const password = row.getValue("password") as string;
      return <PasswordCell password={password} />;
    },
  },
  {
    accessorKey: "cut",
    header: "Cut",
    cell: ({ row }) => {
      const cut = parseFloat(row.getValue("cut"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(cut);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "houseCut",
    header: "House Cut",
    cell: ({ row }) => {
      const houseCut = parseFloat(row.getValue("houseCut"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(houseCut);
      return <div className="font-medium">{formatted}</div>;
    },
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
    accessorKey: "cartela",
    header: "Cartela",
    cell: ({ row }) => {
      const cartela = row.getValue("cartela") as string | null;
      return (
        <ToolTip
          trigger={
            <Badge
              className="cursor-default"
              variant={cartela ? "default" : "outline"}
            >
              {cartela ? "Own" : "Default"}
            </Badge>
          }
          content={cartela ? cartela : "Default"}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return (
        <Badge variant={status ? "default" : "destructive"}>
          {status ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];
