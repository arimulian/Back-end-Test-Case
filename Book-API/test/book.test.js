import supertest from "supertest";
import { web } from "../src/app/web.js";
import { prismaClient } from "../src/app/database.js";

describe("POST /api/book", () => {
  afterEach(async () => {
    await prismaClient.book.deleteMany({
      where: {
        code: "ABC123",
      },
    });
  });
  it("should success create book", async () => {
    const result = await supertest(web).post("/api/book").send({
      code: "ABC123",
      title: "The Lord of the Rings",
      author: "J. R. R. Tolkien",
      stock: 1,
    });
    console.log(result.body);
    expect(result.statusCode).toBe(201);
    expect(result.body.data.code).toBe("ABC123");
    expect(result.body.data.title).toBe("The Lord of the Rings");
    expect(result.body.data.author).toBe("J. R. R. Tolkien");
    expect(result.body.data.stock).toBe(1);
  });

  it("should reject if request body is empty", async () => {
    const result = await supertest(web).post("/api/book").send({
      code: "",
      title: "",
      author: "",
      stock: "",
    });
    console.log(result.body);
    expect(result.statusCode).toBe(400);
    expect(result.body).toBeDefined();
  });

  it("should reject if code already exist", async () => {
    let result = await supertest(web).post("/api/book").send({
      code: "ABC123",
      title: "The Lord of the Rings",
      author: "J. R. R. Tolkien",
      stock: 1,
    });

    result = await supertest(web).post("/api/book").send({
      code: "ABC123",
      title: "The Lord of the Rings",
      author: "J. R. R. Tolkien",
      stock: 1,
    });
    console.log(result.body);
    expect(result.statusCode).toBe(400);
    expect(result.body).toBeDefined();
  });
});

describe("GET /api/book", () => {
  beforeEach(async () => {
    await prismaClient.book.create({
      data: {
        code: "ABC123",
        title: "The Lord of the Rings",
        author: "J. R. R. Tolkien",
        stock: 1,
      },
    });
  });

  afterEach(async () => {
    await prismaClient.book.deleteMany({
      where: {
        code: "ABC123",
      },
    });
  });

  it("should success get all book", async () => {
    const result = await supertest(web).get("/api/book");
    console.log(result.body);
    expect(result.statusCode).toBe(200);
    expect(result.body.data.length).toBeGreaterThan(0);
  });

  it("should success if book is empty", async () => {
    await prismaClient.book.deleteMany({
      where: {
        code: "ABC123",
      },
    });
    const result = await supertest(web).get("/api/book");
    console.log(result.body);
    expect(result.statusCode).toBe(200);
    expect(result.body.data.length).toBe(0);
  });
});
