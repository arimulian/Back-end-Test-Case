import supertest from "supertest";
import { web } from "../src/app/web.js";
import { prismaClient } from "../src/app/database.js";

describe("POST /api/borrow", () => {
  beforeAll(async () => {
    await prismaClient.member.create({
      data: {
        code: "A123",
        name: "John Doe",
      },
    });
    await prismaClient.book.createMany({
      data: [
        {
          code: "a",
          title: "The Lord of the Rings",
          author: "J. R. R. Tolkien",
          stock: 1,
        },
        {
          code: "b",
          title: "The Lord of ",
          author: "J. R. R. Tolkien",
          stock: 1,
        },
        {
          code: "c",
          title: "The Lord",
          author: "J. R. R. Tolkien",
          stock: 1,
        },
      ],
      skipDuplicates: true,
    });
  });

  it("should success create borrow", async () => {
    const result = await supertest(web).post("/api/borrow").send({
      code_member: "A123",
      code_book: "a",
    });
    console.log(result.body);
    expect(result.statusCode).toBe(201);
    expect(result.body.message).toBe("Success create borrow");
  });

  it("should reject if member already have 2 borrow", async () => {
    let result = await supertest(web).post("/api/borrow").send({
      code_member: "A123",
      code_book: "b",
    });
    result = await supertest(web).post("/api/borrow").send({
      code_member: "A123",
      code_book: "c",
    });
    console.log(result.body);
    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe("Member can only borrow 2 books");
  });
});
