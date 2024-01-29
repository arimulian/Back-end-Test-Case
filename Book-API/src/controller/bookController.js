import memberService from "../service/bookService.js";

const create = async (req, res, next) => {
  try {
    const book = await memberService.createBook(req.body);
    res.status(201).json({
      status: "success",
      message: "Success create book",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  try {
    const book = await memberService.findAllBook();
    if (book.length === 0) {
      res.status(200).json({
        status: "success",
        message: "book is empty",
        data: [],
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Success get all book",
        data: book,
      });
    }
  } catch (error) {
    next(error);
  }
};

export default { create, getBooks };
