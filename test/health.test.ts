import request from "supertest";
import app from "../src/app";

describe("Health route", () => {
  test("GET /api/v1/health -> 200", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(typeof res.body.timestamp).toBe("string");
  });
});