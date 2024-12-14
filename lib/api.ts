import {
  UserIcon,
  DollarSignIcon,
  ActivityIcon,
  Calendar1Icon,
} from "lucide-react";

export const fetchMetrics = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/metrics`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch metrics");
    }
    const data = await response.json();

    return [
      {
        label: "Total Users",
        value: data.totalUsers.toLocaleString(),
        icon: UserIcon,
        color: "text-blue-500",
      },
      {
        label: "Total Plays",
        value: data.totalPlays.toLocaleString(),
        icon: DollarSignIcon,
        color: "text-green-500",
      },
      {
        label: "No of Cartelas",
        value: data.totalCartelas.toLocaleString(),
        icon: Calendar1Icon,
        color: "text-red-500",
      },
      {
        label: "Active Users",
        value: data.activeUsers.toLocaleString(),
        icon: ActivityIcon,
        color: "text-yellow-500",
      },
    ];
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async (
  page: number,
  pageSize: number,
  baseUrl: string = ""
) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/users?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();

    return data;
  } catch (error: Error | any) {
    throw error;
    // Keep the default data if the API request fails
  }
};

export const fetchLimitUsers = async (
  page: number,
  pageSize: number,
  baseUrl: string = ""
) => {
  try {
    const response = await fetch(
      `${baseUrl}/users/limit?page=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Failed to users limit");
    }
    const data = await response.json();

    return data;
  } catch (error: Error | any) {
    throw error;
  }
};
