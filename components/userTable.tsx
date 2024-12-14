"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { usersColumns, User } from "@/components/users-columns";
import { useToast } from "@/hooks/use-toast";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [usersTotalPages, setUsersTotalPages] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const [usersPageSize, setUsersPageSize] = useState(20);

  const { toast } = useToast();

  const fetchUsers = async (page: number, pageSize: number) => {
    try {
      const response = await fetch(
        `/api/users?page=${page}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
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

  useEffect(() => {
    fetchUsers(usersPage, usersPageSize);
  }, [usersPage, usersPageSize]);

  return (
    <DataTable
      columns={usersColumns}
      data={users.map((user, index) => ({ ...user, id: index + 1 }))}
      pageCount={usersTotalPages}
      onPageChange={(page) => setUsersPage(page)}
      onPageSizeChange={(pageSize) => setUsersPageSize(pageSize)}
    />
  );
};

export default UserTable;
