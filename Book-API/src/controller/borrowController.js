import borrowService from "../service/borrowService.js";
const create = async (req, res, next) => {
  try {
    const borrow = await borrowService.addBorrowedBook(req.body);
    res.status(201).json({
      status: "success",
      message: "Success create borrow",
      data: borrow,
    });
    return borrow;
  } catch (error) {
    next(error);
  }
};

const returned = async (req, res, next) => {
  try {
    const borrow = await borrowService.returnedBook(req.body);
    res.status(201).json({
      status: "success",
      message: "Success return book",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, returned };
