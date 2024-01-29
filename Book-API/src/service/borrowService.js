import { addBorrowValidation } from "../validation/borrowValidation.js";
import { validationError } from "../validation/validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/ResponseError.js";
import { v4 as uuidv4 } from "uuid";

const addBorrowedBook = async (request) => {
  const borrow = validationError(addBorrowValidation, request);
  const book = await prismaClient.book.findFirst({
    where: {
      code: borrow.code_book,
    },
  });
  const borrows = await prismaClient.borrow.findFirst({
    where: {
      code_member: borrow.code_member,
    },
    select: {
      time_borrow: true,
      time_return: true,
    },
  });
  const dataBorrow = await prismaClient.borrow.findMany({
    where: {
      member: {
        code: borrow.code_member,
      },
    },
    select: {
      code: true,
      code_book: true,
      code_member: true,
      book: {
        select: {
          code: true,
          stock: true,
        },
      },
      member: {
        select: {
          code: true,
        },
      },
      time_borrow: true,
      time_return: true,
    },
  });

  if (dataBorrow === null) {
    await prismaClient.borrow.create({
      data: {
        code: uuidv4(),
        code_book: borrow.code_book,
        code_member: borrow.code_member,
      },
    });
    //     update stock in the table book
    await prismaClient.book.update({
      where: {
        code: borrow.code_book,
      },
      data: {
        stock: book.stock - 1,
      },
    });
  } else if (dataBorrow.length >= 2) {
    throw new ResponseError(400, "Member can only borrow 2 books");
    //check if book is already borrowed
  } else if (dataBorrow.find((item) => item.code_book === borrow.code_book)) {
    throw new ResponseError(400, "Book already borrowed");
  } else if (book.stock === 0) {
    throw new ResponseError(400, "Book is not available");
  } else if (
    dataBorrow.find(
      (item) =>
        item.time_return.getDate() > new Date(borrows.time_borrow.getDate() + 7)
    )
  ) {
    throw new ResponseError(
      400,
      "Book is not returned within 7 days, you can't borrow it again 3 days later"
    );
  } else if (
    dataBorrow.find((item) => item.time_return.getDate() === new Date() + 3)
  ) {
    await prismaClient.borrow.create({
      data: {
        code: uuidv4(),
        code_book: borrow.code_book,
        code_member: borrow.code_member,
      },
    });
    //     update stock in the table book
    await prismaClient.book.update({
      where: {
        code: borrow.code_book,
      },
      data: {
        stock: book.stock - 1,
      },
    });
  } else {
    await prismaClient.borrow.create({
      data: {
        code: uuidv4(),
        code_book: borrow.code_book,
        code_member: borrow.code_member,
      },
    });
    //     update stock in the table book
    await prismaClient.book.update({
      where: {
        code: borrow.code_book,
      },
      data: {
        stock: book.stock - 1,
      },
    });
  }
};

const returnedBook = async (request) => {
  const borrow = validationError(addBorrowValidation, request);
  const dataBorrow = await prismaClient.borrow.findFirst({
    where: {
      member: {
        code: borrow.code_member,
      },
    },
    select: {
      code: true,
      code_book: true,
      code_member: true,
      book: {
        select: {
          code: true,
          stock: true,
        },
      },
      member: {
        select: {
          code: true,
        },
      },
      time_borrow: true,
      time_return: true,
    },
  });

  if (dataBorrow.code_book !== borrow.code_book) {
    throw new ResponseError(400, "You are not borrowing this book");
  } else {
    await prismaClient.borrow.update({
      where: {
        code: dataBorrow.code,
        code_member: borrow.code_member,
        code_book: borrow.code_book,
      },
      data: {
        time_return: new Date().toISOString(),
      },
    });
    await prismaClient.book.update({
      where: {
        code: borrow.code_book,
      },
      data: {
        stock: dataBorrow.book.stock + 1,
      },
    });
  }
};

export default { addBorrowedBook, returnedBook };
