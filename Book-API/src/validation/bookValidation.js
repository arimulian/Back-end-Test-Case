import joi from "joi";

const addBookValidation = joi.object({
  code: joi.string().max(100).required(),
  title: joi.string().max(100).required(),
  author: joi.string().max(100).required(),
  stock: joi.number().positive().required(),
});

export { addBookValidation };
