import { db } from "../src/config/firebaseConfig";
import * as service from "../src/api/v1/services/branchService";
import { Branch } from "../src/api/v1/models/branch";

const mockCollection = {
  get: jest.fn(),
  add: jest.fn(),
  doc: jest.fn().mockReturnThis(),
  update: jest.fn(),
  delete: jest.fn(),
};

(db.collection as jest.Mock).mockReturnValue(mockCollection);

describe("Branch Service", () => {
  afterEach(() => jest.clearAllMocks());

  test("listBranches returns all branches", async () => {
    const mockDocs = [
      { id: "1", data: () => ({ name: "Main Branch", address: "Downtown" }) },
    ];
    mockCollection.get.mockResolvedValue({ docs: mockDocs });

    const result = await service.listBranches();

    expect(db.collection).toHaveBeenCalledWith("branches");
    expect(result[0].name).toBe("Main Branch");
  });

  test("createBranch adds a new branch", async () => {
    const newBranch: Omit<Branch, "id"> = {
      name: "West End",
      address: "123 Main St",
      phone: "204-555-9999",
    };
    mockCollection.add.mockResolvedValue({ id: "456" });

    const result = await service.createBranch(newBranch);

    expect(mockCollection.add).toHaveBeenCalledWith(newBranch);
    expect(result.id).toBe(456);
  });
});
