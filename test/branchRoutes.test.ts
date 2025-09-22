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

test("POST /api/v1/branches -> 400 (missing required)", async () => {
  const res = await request(app).post("/api/v1/branches").send({ name: "No Address", phone: "204-555-0000" });
  expect(res.status).toBe(400);
});

test("GET /api/v1/branches/abc -> 400", async () => {
  const res = await request(app).get("/api/v1/branches/abc");
  expect(res.status).toBe(400);
});

test("PUT /api/v1/branches/:id -> 200", async () => {
  const created = await request(app).post("/api/v1/branches").send({
    name: "Updatable Branch", address: "2 Test Ave, Winnipeg, MB", phone: "204-555-4444"
  });
  const id = created.body.data.id;
  const res = await request(app).put(`/api/v1/branches/${id}`).send({ phone: "204-555-9999" });
  expect(res.status).toBe(200);
  expect(res.body.data.phone).toBe("204-555-9999");
});

test("PUT /api/v1/branches/xyz -> 400", async () => {
  const res = await request(app).put("/api/v1/branches/xyz").send({ phone: "123" });
  expect(res.status).toBe(400);
});

test("DELETE /api/v1/branches/:id -> 200 then 404", async () => {
  const created = await request(app).post("/api/v1/branches").send({
    name: "Remove Branch", address: "3 Test Ave, Winnipeg, MB", phone: "204-555-5555"
  });
  const id = created.body.data.id;
  const del1 = await request(app).delete(`/api/v1/branches/${id}`);
  expect(del1.status).toBe(200);
  const del2 = await request(app).delete(`/api/v1/branches/${id}`);
  expect(del2.status).toBe(404);
});