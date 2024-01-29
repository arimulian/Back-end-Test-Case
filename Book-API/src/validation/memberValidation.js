import joi from "joi";

const addMemberValidation = joi.object({
  code: joi.string().max(100).required(),
  name: joi.string().max(100).required(),
});

export { addMemberValidation };
