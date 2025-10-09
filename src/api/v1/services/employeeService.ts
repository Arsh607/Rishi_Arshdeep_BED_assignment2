import { employees } from "../../../data/employees";
import { Employee } from "../models/employee";


let lastEmployeeId = employees.reduce((max, e) => Math.max(max, e.id), 0);


export const listEmployees = (): Employee[] => employees;


export const getEmployeeById = (id: number): Employee | undefined =>
  employees.find((e) => e.id === id);


export const createEmployee = (payload: Omit<Employee, "id">): Employee => {
  lastEmployeeId += 1;
  const out: Employee = { id: lastEmployeeId, ...payload };
  employees.push(out);
  return out;
};


export const updateEmployee = (id: number, patch: Partial<Omit<Employee, "id">>): Employee | undefined => {
  const e = employees.find((x) => x.id === id);
  if (!e) return undefined;
  Object.assign(e, patch);
  return e;
};

export const deleteEmployee = (id: number): boolean => {
  const i = employees.findIndex((x) => x.id === id);
  if (i === -1) return false;
  employees.splice(i, 1);
  return true;
};