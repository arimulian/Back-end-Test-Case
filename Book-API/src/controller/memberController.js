import { createMember, findAllMember } from "../service/memberService.js";

const create = async (req, res, next) => {
  try {
    const member = await createMember(req.body);
    res.status(201).json({
      status: "success",
      message: "Success create member",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

const getMember = async (req, res, next) => {
  try {
    const member = await findAllMember();
    if (member.length === 0) {
      res.status(200).json({
        status: "success",
        message: "member is empty",
        data: [],
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Success get all member",
        data: member,
      });
    }
  } catch (e) {
    next(e);
  }
};
export default { create, getMember };
