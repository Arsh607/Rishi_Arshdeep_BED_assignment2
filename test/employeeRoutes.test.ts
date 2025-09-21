import request from "supertest";
import app from "../src/app";

describe("Employee routes (part 1)", () => {
  let createdId: number;

  test("POST /api/v1/employees -> 201", async () => {
    const res = await request(app).post("/api/v1/employees").send({
      name: "Test User", position: "Analyst", department: "Finance",
      email: "test.user@pixell-river.com", phone: "204-555-0000", branchId: 1
    });
    expect(res.status).toBe(201);
    createdId = res.body.data.id;
  });

  test("GET /api/v1/employees/:id -> 200", async () => {
    const res = await request(app).get(`/api/v1/employees/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(createdId);
  });

  test("GET /api/v1/employees -> 200", async () => {
    const res = await request(app).get("/api/v1/employees");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});