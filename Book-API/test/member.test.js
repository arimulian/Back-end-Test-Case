import supertest from "supertest";
import { web } from "../src/app/web.js";
import { prismaClient } from "../src/app/database.js";

describe("POST /api/member", () => {
  afterEach(async () => {
    await prismaClient.member.deleteMany({
      where: {
        code: "ABC123",
      },
    });
  });

  it("should success create member", async () => {
    const result = await supertest(web).post("/api/member").send({
      code: "ABC123",
      name: "John Doe",
    });

    expect(result.statusCode).toBe(201);
    expect(result.body.data.code).toBe("ABC123");
    expect(result.body.data.name).toBe("John Doe");
  });

  it("should reject if request body is empty", async () => {
    const result = await supertest(web).post("/api/member").send({
      code: "",
      name: "",
    });

    console.log(result.body);

    expect(result.status).toBe(400);
    expect(result.body).toBeDefined();
  });
});

describe("GET /api/member", () => {
  beforeEach(async () => {
    await prismaClient.member.create({
      data: {
        code: "ABC123",
        name: "John Doe",
      },
    });
  });
  afterEach(async () => {
    await prismaClient.member.deleteMany({
      where: {
        code: "ABC123",
      },
    });
  });
  it("should success get all member", async () => {
    const result = await supertest(web).get("/api/member");
    console.log(result.body);
    expect(result.statusCode).toBe(200);
    expect(result.body.data.length).toBeGreaterThan(0);
  });
});
