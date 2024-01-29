import { ResponseError } from "../error/ResponseError.js";

const validationError = (schema, request) => {
  const { error, value } = schema.validate(request);
  if (error) {
    throw new ResponseError(400, error.message);
  } else {
    return value;
  }
};

export { validationError };
