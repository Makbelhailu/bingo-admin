import { User } from "@/components/users-columns";
import { RiskUser } from "@/components/limit-columns";

export const defaultUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johnd",
    password: "password123",
    cut: 0.05,
    houseCut: 0.1,
    limit: 10000,
    cartela: "ABC123",
    status: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janes",
    password: "securepass",
    cut: 0.07,
    houseCut: 0.12,
    limit: 15000,
    cartela: "DEF456",
    status: false,
  },
  {
    id: 3,
    name: "Bob Johnson",
    username: "bobj",
    password: "bobpass",
    cut: 0.06,
    houseCut: 0.11,
    limit: 12000,
    cartela: "GHI789",
    status: true,
  },
];

export const defaultRiskUsers: RiskUser[] = [
  {
    id: 1,
    username: "johnd",
    limit: 10000,
    risk: "Low",
  },
  {
    id: 2,
    username: "janes",
    limit: 15000,
    risk: "Medium",
  },
  {
    id: 3,
    username: "bobj",
    limit: 12000,
    risk: "High",
  },
];

export const defaultMetrics = {
  totalUsers: 1234,
  totalBets: 987654,
  highRiskUsers: 56,
  activeUsers: 789,
};
