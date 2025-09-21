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

test("POST /api/v1/employees -> 400 (missing required)", async () => {
  const res = await request(app).post("/api/v1/employees").send({
    position: "Analyst", department: "Finance", email: "bad@pixell-river.com", phone: "204-555-0001", branchId: 1
  });
  expect(res.status).toBe(400);
});

test("GET /api/v1/employees/abc -> 400", async () => {
  const res = await request(app).get("/api/v1/employees/abc");
  expect(res.status).toBe(400);
});

test("PUT /api/v1/employees/:id -> 200 (partial update)", async () => {
  const created = await request(app).post("/api/v1/employees").send({
    name: "Patch Me", position: "Analyst", department: "Finance",
    email: "patch@pixell-river.com", phone: "204-555-1111", branchId: 1
  });
  const id = created.body.data.id;
  const res = await request(app).put(`/api/v1/employees/${id}`).send({ phone: "204-555-4321" });
  expect(res.status).toBe(200);
  expect(res.body.data.phone).toBe("204-555-4321");
});

test("PUT /api/v1/employees/xyz -> 400", async () => {
  const res = await request(app).put("/api/v1/employees/xyz").send({ phone: "123" });
  expect(res.status).toBe(400);
});

test("DELETE /api/v1/employees/:id -> 200 then 404", async () => {
  const created = await request(app).post("/api/v1/employees").send({
    name: "Remove Me", position: "Analyst", department: "Finance",
    email: "remove@pixell-river.com", phone: "204-555-2222", branchId: 1
  });
  const id = created.body.data.id;
  const del1 = await request(app).delete(`/api/v1/employees/${id}`);
  expect(del1.status).toBe(200);
  const del2 = await request(app).delete(`/api/v1/employees/${id}`);
  expect(del2.status).toBe(404);
});