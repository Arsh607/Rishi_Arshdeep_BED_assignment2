import { Employee } from "../api/v1/models/employee";
export const employees: Employee[] = [
  { id: 1, name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchId: 1 },
  { id: 2, name: "Bob Lee", position: "Teller", department: "Customer Service", email: "bob.lee@pixell-river.com", phone: "604-555-0101", branchId: 1 },
  { id: 3, name: "Carmen Diaz", position: "Financial Advisor", department: "Advisory", email: "carmen.diaz@pixell-river.com", phone: "780-555-0121", branchId: 2 }
];