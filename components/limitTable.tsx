"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { riskColumns, RiskUser } from "@/components/limit-columns";
import { useToast } from "@/hooks/use-toast";

const LimitTable = () => {
  const [riskUsers, setRiskUsers] = useState<RiskUser[]>([]);
  const [riskTotalPages, setRiskTotalPages] = useState(1);
  const [riskPage, setRiskPage] = useState(1);
  const [riskPageSize, setRiskPageSize] = useState(20);

  const { toast } = useToast();

  const fetchLimitUsers = async (page: number, pageSize: number) => {
    try {
      const response = await fetch(
        `/api/users/limit?page=${page}&pageSize=${pageSize}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error("Failed to users limit");
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
    fetchLimitUsers(riskPage, riskPageSize);
  }, [riskPage, riskPageSize]);

  return (
    <DataTable
      columns={riskColumns}
      data={riskUsers.map((risk, index) => {
        let limitRisk = "Low";
        if (risk.limit < 3000 && risk.limit > 1000) limitRisk = "Medium";
        if (risk.limit < 1000) limitRisk = "High";
        return {
          ...risk,
          id: index + 1,
          risk: limitRisk as "High" | "Medium" | "Low",
        };
      })}
      pageCount={riskTotalPages}
      onPageChange={(page) => setRiskPage(page)}
      onPageSizeChange={(pageSize) => setRiskPageSize(pageSize)}
    />
  );
};

export default LimitTable;
