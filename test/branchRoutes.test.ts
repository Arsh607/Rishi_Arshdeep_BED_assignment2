import request from "supertest";
import app from "../src/app";

describe("Branch routes (part 1)", () => {
  let createdId: number;

  test("POST /api/v1/branches -> 201", async () => {
    const res = await request(app).post("/api/v1/branches").send({
      name: "Test Branch", address: "1 Test Street, Winnipeg, MB", phone: "204-555-3333"
    });
    expect(res.status).toBe(201);
    createdId = res.body.data.id;
  });

  test("GET /api/v1/branches/:id -> 200", async () => {
    const res = await request(app).get(`/api/v1/branches/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(createdId);
  });

  test("GET /api/v1/branches -> 200", async () => {
    const res = await request(app).get("/api/v1/branches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});