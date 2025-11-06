import { db } from "../src/config/firebaseConfig";
import * as service from "../src/api/v1/services/employeeService";
import { Employee } from "../src/api/v1/models/employee";


const mockCollection = {
  get: jest.fn(),
  add: jest.fn(),
  doc: jest.fn().mockReturnThis(),
  update: jest.fn(),
  delete: jest.fn(),
};

(db.collection as jest.Mock).mockReturnValue(mockCollection);

describe("Employee Service", () => {
  afterEach(() => jest.clearAllMocks());

  test("listEmployees returns all employees", async () => {
    const mockDocs = [
      { id: "1", data: () => ({ name: "John", position: "Manager" }) },
      { id: "2", data: () => ({ name: "Jane", position: "Developer" }) },
    ];
    mockCollection.get.mockResolvedValue({ docs: mockDocs });

    const result = await service.getAllEmployees();

    expect(db.collection).toHaveBeenCalledWith("employees");
    expect(result.length).toBe(2);
    expect(result[0].name).toBe("John");
  });

  test("createEmployee adds a new employee", async () => {
    const newEmployee: Omit<Employee, "id"> = {
      name: "Amrit",
      position: "Designer",
      department: "UI",
      email: "amrit@example.com",
      phone: "204-555-1212",
      branchId: 1,
    };

    mockCollection.add.mockResolvedValue({ id: "123" });

    const result = await service.createEmployee(newEmployee);

    expect(db.collection).toHaveBeenCalledWith("employees");
    expect(mockCollection.add).toHaveBeenCalledWith(newEmployee);
    expect(result.id).toBe(123);
  });

  test("deleteEmployee deletes a record", async () => {
    mockCollection.delete.mockResolvedValue(true);
    const result = await service.deleteEmployee(123);

    expect(db.collection).toHaveBeenCalledWith("employees");
    expect(mockCollection.doc).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
