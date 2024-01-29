import { validationError } from "../validation/validation.js";
import { addBookValidation } from "../validation/bookValidation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/ResponseError.js";
const createBook = async (request) => {
  const book = validationError(addBookValidation, request);
  const countBook = await prismaClient.book.count({
    where: {
      code: book.code,
    },
  });

  if (countBook === 1) {
    throw new ResponseError(400, "Code already exist");
  }
  return await prismaClient.book.create({
    data: book,
    select: {
      code: true,
      title: true,
      author: true,
      stock: true,
    },
  });
};

const findAllBook = async () => {
  const book = await prismaClient.book.findMany({
    select: {
      code: true,
      title: true,
      author: true,
      stock: true,
    },
  });
  return book;
};

export default { createBook, findAllBook };
