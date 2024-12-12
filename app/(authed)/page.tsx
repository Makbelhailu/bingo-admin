"use client";

import { useState, useEffect } from "react";
import { MetricCards } from "@/components/metric-cards";
import { DataTable } from "@/components/data-table";
import { usersColumns, User } from "@/components/users-columns";
import { riskColumns, RiskUser } from "@/components/limit-columns";
import { defaultUsers, defaultRiskUsers } from "@/lib/default-data";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [riskUsers, setRiskUsers] = useState<RiskUser[]>(defaultRiskUsers);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [riskTotalPages, setRiskTotalPages] = useState(1);
  const [usersPage, setUsersPage] = useState(0);
  const [riskPage, setRiskPage] = useState(0);
  const [usersPageSize, setUsersPageSize] = useState(20);
  const [riskPageSize, setRiskPageSize] = useState(20);

  const { toast } = useToast();

  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      const response = await fetch(
        `/api/users?page=${page}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        const error =
          (await response.json()).message || "Failed to fetch users";
        throw new Error(error);
      }
      const data = await response.json();
      setUsers(data.users);
      setUsersTotalPages(data.totalPages);
    } catch (error: Error | any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      // Keep the default data if the API request fails
    }
  };

  const fetchLimitUsers = async (page: number, pageSize: number) => {
    try {
      const response = await fetch(
        `/api/users/limit?page=${page}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        const error =
          (await response.json()).message || "Failed to users limit";
        throw new Error(error);
      }
      const data = await response.json();
      setRiskUsers(data.users);
      setRiskTotalPages(data.totalPages);
    } catch (error: Error | any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    fetchUsers(usersPage, usersPageSize);
    fetchLimitUsers(riskPage, riskPageSize);
  }, [usersPage, usersPageSize, riskPage, riskPageSize]);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <MetricCards />
      <div className="2xl:grid grid-cols-6 gap-4">
        <div className="2xl:col-span-4 h-fit">
          <h3 className="text-lg font-medium mb-4">Users</h3>
          <DataTable
            columns={usersColumns}
            data={users}
            pageCount={usersTotalPages}
            onPageChange={(page) => setUsersPage(page)}
            onPageSizeChange={(pageSize) => setUsersPageSize(pageSize)}
          />
        </div>
        <div className=" 2xl:col-span-2 h-full">
          <h3 className="text-lg font-medium mb-4">Limit Assessment</h3>
          <DataTable
            columns={riskColumns}
            data={riskUsers}
            pageCount={riskTotalPages}
            onPageChange={(page) => setRiskPage(page)}
            onPageSizeChange={(pageSize) => setRiskPageSize(pageSize)}
          />
        </div>
      </div>
    </div>
  );
}
