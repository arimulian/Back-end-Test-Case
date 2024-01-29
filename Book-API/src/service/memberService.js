import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/ResponseError.js";
import { addMemberValidation } from "../validation/memberValidation.js";
import { validationError } from "../validation/validation.js";

const createMember = async (request) => {
  const member = validationError(addMemberValidation, request);
  const countUser = await prismaClient.member.count({
    where: {
      code: member.code,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Code already exist");
  }

  return await prismaClient.member.create({
    data: member,
    select: {
      code: true,
      name: true,
    },
  });
};

const findAllMember = async () => {
  const member = await prismaClient.member.findMany({
    select: {
      code: true,
      name: true,
    },
  });
  return member;
};
export { createMember, findAllMember };
