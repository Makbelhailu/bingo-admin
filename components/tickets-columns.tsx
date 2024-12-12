// "use client"

// import { ColumnDef } from "@tanstack/react-table"
// import { getPriorityBadge } from "./data-table"
// import { Badge } from "@/components/ui/badge"

// export type Ticket = {
//   id: string
//   subject: string
//   assignee: string
//   priority: string
//   status: string
//   createdDate: string
//   dueDate: string
// }

// export const ticketsColumns: ColumnDef<Ticket>[] = [
//   {
//     accessorKey: "id",
//     header: "Ticket ID",
//   },
//   {
//     accessorKey: "subject",
//     header: "Subject",
//   },
//   {
//     accessorKey: "assignee",
//     header: "Assignee",
//   },
//   {
//     accessorKey: "priority",
//     header: "Priority",
//     cell: ({ row }) => getPriorityBadge(row.getValue("priority")),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <Badge variant={row.getValue("status") === "Open" ? "default" : "secondary"}>
//         {row.getValue("status")}
//       </Badge>
//     ),
//   },
//   {
//     accessorKey: "createdDate",
//     header: "Created",
//   },
//   {
//     accessorKey: "dueDate",
//     header: "Due Date",
//   },
// ]
