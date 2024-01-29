import joi from "joi";

const addBorrowValidation = joi.object({
  code_member: joi.string().max(100).required(),
  code_book: joi.string().max(100).required(),
});

export { addBorrowValidation };
